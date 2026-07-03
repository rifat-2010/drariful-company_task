import React, { useState, useEffect } from "react";
import { 
  getBlogs, addBlog, updateBlog, deleteBlog,
  getGallery, addGalleryItem, deleteGalleryItem,
  getProjects, addProject, updateProject, deleteProject,
  uploadImageFile, logout 
} from "../lib/cms";
// ... (সব UI components এবং Icons আগের মতোই থাকবে)

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

// Dashboard.jsx এর ভেতর ডাটা লোড করার সঠিক নিয়ম
useEffect(() => {
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [dbBlogs, dbGallery, dbProjects] = await Promise.all([
        getBlogs(),
        getGallery(),
        getProjects()
      ]);
      // এখানে আপনার অরিজিনাল স্টেট নাম ব্যবহার করুন (blogs, galleryItems, projects)
      setBlogs(dbBlogs || []);
      setGalleryItems(dbGallery || []);
      setProjects(dbProjects || []);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };
  loadInitialData();
}, []);

  // --- BLOG HANDLERS ---
  const handleAddBlog = async (formData) => {
    try {
      const newBlog = await addBlog(formData);
      setBlogs([newBlog, ...blogs]);
      return true;
    } catch (err) { alert("Failed to add blog"); return false; }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Delete this blog permanently?")) {
      await deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  // --- GALLERY HANDLERS ---
  const handleAddGallery = async (formData) => {
    try {
      const newItem = await addGalleryItem(formData);
      setGallery([newItem, ...gallery]);
      return true;
    } catch (err) { alert("Failed to upload image"); return false; }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm("Delete this image?")) {
      await deleteGalleryItem(id);
      setGallery(gallery.filter(g => g.id !== id));
    }
  };

  // --- UI RENDER (আগের মতোই থাকবে কিন্তু ডাটা আসবে স্টেট থেকে) ---
  if (loading) return <div className="p-10 text-center">Loading Dashboard Security...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* আপনার আগের সব Tabs, Modals এবং Forms এখানে থাকবে */}
      {/* শুধু নিশ্চিত করুন যে সেগুলো 'blogs', 'gallery' এবং 'projects' স্টেট ব্যবহার করছে */}
    </div>
  );
};

export default Dashboard;