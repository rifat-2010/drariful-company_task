import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secure_secret_2026";
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "15mb" }));

// --- DATABASE CONNECTION FUNCTION ---
let errorLog = "No error yet";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB Connected");
    errorLog = "Successfully Connected";
  } catch (err) {
    errorLog = err.message;
    console.error("❌ MongoDB Error:", err.message);
  }
};

// --- API ROUTES ---

// Health Check (এটি এখন এরর মেসেজ শো করবে)
app.get("/api/health", async (req, res) => {
  // ক্যাশ বন্ধ করার জন্য এই হেডারগুলো জরুরি
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  await connectDB();
  
  res.json({ 
    status: "ok", 
    db: mongoose.connection.readyState === 1,
    connectionState: mongoose.connection.readyState, // 1 মানে কানেক্টেড
    error: errorLog, // এখানে আমরা আসল সমস্যা দেখতে পাবো
    time: new Date().toISOString()
  });
});

// Models
const Blog = mongoose.models.Blog || mongoose.model("Blog", new mongoose.Schema({ title: String, coverImage: String, category: String, content: String, author: String, date: String }, { timestamps: true }));
const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({ title: String, summary: String, description: String, status: String, year: String, field: String, collaborators: [String], imageUrl: String, featured: Boolean }, { timestamps: true }));
const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", new mongoose.Schema({ src: String, alt: String, caption: String }, { timestamps: true }));

// ব্লগ লিস্ট দেখার রুট
app.get("/api/blogs", async (req, res) => {
  await connectDB();
  const data = await Blog.find().sort({ createdAt: -1 }).lean();
  res.json(data.map(d => ({ ...d, id: d._id })));
});

// গ্যালারি দেখার রুট
app.get("/api/gallery", async (req, res) => {
  await connectDB();
  const data = await Gallery.find().sort({ createdAt: -1 }).lean();
  res.json(data.map(d => ({ ...d, id: d._id })));
});

// প্রজেক্ট দেখার রুট
app.get("/api/projects", async (req, res) => {
    await connectDB();
    const data = await Project.find().sort({ createdAt: -1 }).lean();
    res.json(data.map(d => ({ ...d, id: d._id })));
});

app.get("/", (req, res) => res.json({ message: "Welcome to Dr. Ariful CMS API" }));

app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));

export default app;