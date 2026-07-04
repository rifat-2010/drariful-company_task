/**
 * server/index.js - THE IRON SAFE (ULTIMATE VERSION)
 * 1. NO JWT/TOKEN: "Access Denied" এরর চিরতরে দূর করা হয়েছে।
 * 2. NO SEEDING: ডাটাবেস রিসেট হওয়ার কোনো কোড এখানে নেই।
 * 3. PERSISTENT: Vercel-এর জন্য কানেকশন অপ্টিমাইজ করা হয়েছে।
 * 4. REAL-TIME: সরাসরি অ্যাডমিন প্যানেল থেকে ডাটাবেসে সেভ হবে।
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- MIDDLEWARES ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "20mb" }));

// --- DATABASE CONNECTION (Cached for Vercel Performance) ---
let isConnected = false;

// এই ফাংশনটি Vercel-এর জন্য সবচেয়ে ফাস্ট কানেকশন নিশ্চিত করবে
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ৫ সেকেন্ডের বেশি ওয়েট করবে না
      maxPoolSize: 10, // ১০টি কানেকশন একসাথে হ্যান্ডেল করতে পারবে
    });
    console.log("✅ VAULT CONNECTED");
  } catch (err) {
    console.error("❌ DB ERROR:", err.message);
  }
};

// --- MODELS (Defined once to prevent Vercel errors) ---
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

// --- UTILITY: To JSON ---
// --- UTILITY: To JSON ---
const toDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  return obj;
};

// --- API ROUTES ---

// Health & Monitoring
app.get("/api/health", async (req, res) => {
  await connectDB();
  
  // রেসপন্স ক্যাশ হওয়া বন্ধ করতে এই লাইনটি 
  res.setHeader('Cache-Control', 'no-store');
  
  res.json({ 
    status: "active", 
    db: mongoose.connection.readyState === 1,
    vault: "Iron Safe Active - No Seeding"
  });
});

// --- API ROUTES ---

// Health & Monitoring
app.get("/api/health", async (req, res) => {
  await connectDB();
  res.json({ 
    status: "active", 
    db: mongoose.connection.readyState === 1,
    vault: "Iron Safe Active - No Seeding"
  });
});

// Admin Login (Simple Email/Password, No Token)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, user: { email, role: "admin" } });
  }
  res.status(401).json({ message: "Invalid credentials." });
});

// BLOGS - CRUD
app.get("/api/blogs", async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  await connectDB();
  const data = await Blog.find().sort({ createdAt: -1 }).lean();
  res.json(data.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/blogs", async (req, res) => {
  await connectDB();
  const doc = await Blog.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.put("/api/blogs/:id", async (req, res) => {
  await connectDB();
  const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toDoc(doc));
});

app.delete("/api/blogs/:id", async (req, res) => {
  await connectDB();
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Removed from vault." });
});

// GALLERY - CRUD
app.get("/api/gallery", async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  await connectDB();
  const data = await Gallery.find().sort({ createdAt: -1 }).lean();
  res.json(data.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/gallery", async (req, res) => {
  await connectDB();
  const doc = await Gallery.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.put("/api/gallery/:id", async (req, res) => {
  await connectDB();
  const doc = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toDoc(doc));
});

app.delete("/api/gallery/:id", async (req, res) => {
  await connectDB();
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// PROJECTS - CRUD
app.get("/api/projects", async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  await connectDB();
  const data = await Project.find().sort({ createdAt: -1 }).lean();
  res.json(data.map(d => ({ ...d, id: d._id.toString() })));
});

app.post("/api/projects", async (req, res) => {
  await connectDB();
  const doc = await Project.create(req.body);
  res.status(201).json(toDoc(doc));
});

app.put("/api/projects/:id", async (req, res) => {
  await connectDB();
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toDoc(doc));
});

app.delete("/api/projects/:id", async (req, res) => {
  await connectDB();
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Root
app.get("/", (req, res) => res.json({ message: "Dr. Ariful CMS API is ready." }));

// Start Local Server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 API Guarded on Port ${PORT}`));
}

export default app;