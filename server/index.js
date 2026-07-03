/**
 * server/index.js - THE FINAL IRON VAULT (NO-TOKEN VERSION)
 * 1. Persistent Connection Logic for Vercel.
 * 2. Detailed Error Logging & Health Monitoring.
 * 3. No Token Required - Admin Email/Pass based validation.
 * 4. 100% Real-time permanent storage.
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- MIDDLEWARES ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "20mb" }));

// --- DATABASE CONNECTION (Vercel Persistent Logic) ---
let cachedDb = null;
let lastError = "No connection attempted";

const connectToDatabase = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    console.log("🔄 Attempting to connect to Vault...");
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    cachedDb = db;
    lastError = "Successfully Connected";
    console.log("✅ VAULT CONNECTED: Ready for data operations.");
    return db;
  } catch (err) {
    lastError = err.message;
    console.error("❌ DATABASE ERROR:", err.message);
    throw err;
  }
};

// --- SCHEMAS & MODELS ---
const commonOptions = { timestamps: true, versionKey: false };

const Blog = mongoose.models.Blog || mongoose.model("Blog", new mongoose.Schema({
  title: String, coverImage: String, category: String, content: String, author: String, date: String
}, commonOptions));

const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({
  title: String, summary: String, description: String, status: String, year: String, field: String, 
  collaborators: [String], imageUrl: String, featured: { type: Boolean, default: false }
}, commonOptions));

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", new mongoose.Schema({
  src: String, alt: String, caption: String
}, commonOptions));

// --- UTILITIES ---
const toDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  return obj;
};

// --- API ROUTES ---

// 1. Health Monitoring (For Admin Peace of Mind)
app.get("/api/health", async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  try {
    await connectToDatabase();
    res.json({
      status: "running",
      database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
      vault_error: lastError,
      time: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ status: "error", error: e.message });
  }
});

// 2. Simple Login (No JWT)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, user: { email, role: "admin" } });
  }
  res.status(401).json({ message: "Unauthorized. Admin credentials required." });
});

// 3. BLOGS API (No Token, Direct DB Access)
app.get("/api/blogs", async (req, res) => {
  await connectToDatabase();
  const docs = await Blog.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/blogs", async (req, res) => {
  await connectToDatabase();
  const doc = await Blog.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.put("/api/blogs/:id", async (req, res) => {
  await connectToDatabase();
  const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toDoc(doc));
});

app.delete("/api/blogs/:id", async (req, res) => {
  await connectToDatabase();
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Removed from vault permanently." });
});

// 4. GALLERY API
app.get("/api/gallery", async (req, res) => {
  await connectToDatabase();
  const docs = await Gallery.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/gallery", async (req, res) => {
  await connectToDatabase();
  const doc = await Gallery.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.delete("/api/gallery/:id", async (req, res) => {
  await connectToDatabase();
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// 5. PROJECTS API
app.get("/api/projects", async (req, res) => {
  await connectToDatabase();
  const docs = await Project.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/projects", async (req, res) => {
  await connectToDatabase();
  const doc = await Project.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.put("/api/projects/:id", async (req, res) => {
  await connectToDatabase();
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toDoc(doc));
});

app.delete("/api/projects/:id", async (req, res) => {
  await connectToDatabase();
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get("/", (req, res) => res.json({ message: "Admin Vault API is Active." }));

// --- SERVER START ---
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Vault Guarded on http://localhost:${PORT}`));
}

export default app;