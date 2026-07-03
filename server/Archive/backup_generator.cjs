const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME || 'drariful_cms';
const uri = `mongodb+srv://${encodeURIComponent(DB_USERNAME)}:${encodeURIComponent(DB_PASSWORD)}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema({ title: String, category: String, coverImage: String, content: String, author: String, date: String }, { timestamps: true });
const gallerySchema = new mongoose.Schema({ src: String, alt: String, caption: String }, { timestamps: true });
const Blog = mongoose.model('Blog', blogSchema, process.env.BLOG_COLLECTION || 'blogs');
const Gallery = mongoose.model('Gallery', gallerySchema, process.env.GALLERY_COLLECTION || 'gallery');
(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    const blogCount = await Blog.countDocuments();
    const galleryCount = await Gallery.countDocuments();
    console.log('blogCount', blogCount);
    console.log('galleryCount', galleryCount);
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(20).lean();
    const gallery = await Gallery.find().sort({ createdAt: -1 }).limit(20).lean();
    console.log('recent blogs', blogs.map(b => ({id: b._id.toString(), title: b.title, date: b.date}))); 
    console.log('recent gallery', gallery.map(g => ({id: g._id.toString(), alt: g.alt, src: g.src})));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
