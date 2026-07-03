import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secure_secret_2026";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "15mb" })); // optimized for Vercel

// --- DATABASE CONNECTION ---
// এখানে কোনো seeding লজিক নেই। এটি শুধু কানেক্ট হবে।
const mongoUri = process.env.MONGO_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("✅ DATABASE SECURED: No auto-reset logic active."))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

// --- MODELS ---
const Blog = mongoose.model("Blog", new mongoose.Schema({ title: String, coverImage: String, category: String, content: String, author: String, date: String }, { timestamps: true }));
const Project = mongoose.model("Project", new mongoose.Schema({ title: String, summary: String, description: String, status: String, year: String, field: String, collaborators: [String], imageUrl: String, featured: Boolean }, { timestamps: true }));
const Gallery = mongoose.model("Gallery", new mongoose.Schema({ src: String, alt: String, caption: String }, { timestamps: true }));

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) { res.status(403).json({ message: "Session Expired" }); }
};

const formatData = (data) => data.map(d => ({ ...d.toObject(), id: d._id.toString() }));

// --- API ROUTES ---

app.get("/api/health", (req, res) => res.json({ status: "ok", db: mongoose.connection.readyState === 1 }));

// Blogs
app.get("/api/blogs", async (req, res) => {
    const data = await Blog.find().sort({ createdAt: -1 }).lean();
    res.json(formatData(data));
});
app.post("/api/blogs", auth, async (req, res) => {
    const doc = await Blog.create(req.body);
    res.status(201).json(doc);
});
app.put("/api/blogs/:id", auth, async (req, res) => {
    const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
});
app.delete("/api/blogs/:id", auth, async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Projects
app.get("/api/projects", async (req, res) => {
    const data = await Project.find().sort({ createdAt: -1 }).lean();
    res.json(formatData(data));
});
app.post("/api/projects", auth, async (req, res) => {
    const doc = await Project.create(req.body);
    res.status(201).json(doc);
});
app.put("/api/projects/:id", auth, async (req, res) => {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
});
app.delete("/api/projects/:id", auth, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Gallery
app.get("/api/gallery", async (req, res) => {
    const data = await Gallery.find().sort({ createdAt: -1 }).lean();
    res.json(formatData(data));
});
app.post("/api/gallery", auth, async (req, res) => {
    const doc = await Gallery.create(req.body);
    res.status(201).json(doc);
});
app.delete("/api/gallery/:id", auth, async (req, res) => {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { email } });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

app.listen(PORT, () => console.log(`🚀 Safety Server running on port ${PORT}`));

export default app;