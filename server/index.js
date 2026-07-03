/**
 * server/index.js - THE IRON SAFE (ULTIMATE VERSION)
 * 1. No Seeding, No Auto-Delete, No Reset Logic.
 * 2. Optimized for Vercel Serverless & MongoDB Persistent Connection.
 * 3. 100% Secure Admin CRUD.
 */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "drariful_cms_secure_2026";

// --- MIDDLEWARES ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "20mb" })); // Supports large image data if needed

// --- DATABASE PERSISTENCE LOGIC (Optimized for Vercel) ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ CRITICAL ERROR: MONGO_URI is missing in .env!");
}

// Global variable to maintain a cached connection in Serverless
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000, // Wait 15s before failing
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ VAULT SECURED: MongoDB Connected Permanently.");
  } catch (err) {
    console.error("❌ DATABASE CONNECTION FAILED:", err.message);
    throw new Error("Database connection could not be established.");
  }
};

// --- SCHEMAS & MODELS ---
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: String,
  category: String,
  content: String,
  author: String,
  date: { type: String, default: () => new Date().toISOString().split("T")[0] }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  description: String,
  status: String,
  year: String,
  field: String,
  collaborators: [String],
  imageUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const gallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: String,
  caption: String
}, { timestamps: true });

// Prevent model re-compilation errors in Vercel
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

// --- UTILITIES ---
const toPublicDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// --- AUTH MIDDLEWARE ---
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token." });
  }
};

// --- ROUTES ---

// Health Check (Reliable check for Vercel/Monitoring)
app.get("/api/health", async (req, res) => {
  await connectToDatabase();
  res.json({ 
    status: "active", 
    db: mongoose.connection.readyState === 1,
    environment: "secure_production" 
  });
});

// Admin Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
      return res.json({ token, user: { email, role: "admin" } });
    }
    res.status(401).json({ message: "Invalid Admin Credentials." });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// BLOGS - CRUD
app.get("/api/blogs", async (req, res) => {
  await connectToDatabase();
  const docs = await Blog.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(toPublicDoc));
});

app.post("/api/blogs", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  const doc = await Blog.create(req.body);
  res.status(201).json(toPublicDoc(doc));
});

app.put("/api/blogs/:id", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  const doc = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Blog not found" });
  res.json(toPublicDoc(doc));
});

app.delete("/api/blogs/:id", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Deleted from vault." });
});

// GALLERY - CRUD
app.get("/api/gallery", async (req, res) => {
  await connectToDatabase();
  const docs = await Gallery.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(toPublicDoc));
});

app.post("/api/gallery", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  const doc = await Gallery.create(req.body);
  res.status(201).json(toPublicDoc(doc));
});

app.delete("/api/gallery/:id", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// PROJECTS - CRUD
app.get("/api/projects", async (req, res) => {
  await connectToDatabase();
  const docs = await Project.find().sort({ createdAt: -1 }).lean();
  res.json(docs.map(toPublicDoc));
});

app.post("/api/projects", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  const doc = await Project.create(req.body);
  res.status(201).json(toPublicDoc(doc));
});

app.put("/api/projects/:id", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toPublicDoc(doc));
});

app.delete("/api/projects/:id", authenticateAdmin, async (req, res) => {
  await connectToDatabase();
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- SERVER INITIALIZATION ---
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 API Guarded on http://localhost:${PORT}`);
  });
}

export default app;