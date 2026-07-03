/**
 * src/Pages/Dashboard.jsx - THE CONTROL CENTER (ULTIMATE VERSION)
 * 1. 100% API Driven (No Firebase, No LocalStorage data).
 * 2. Robust Error Handling (Try-Catch) to prevent crashes.
 * 3. Unified CRUD for Blogs, Projects, and Gallery.
 */

import React, { useState, useEffect } from "react";
import { 
  getBlogs, addBlog, updateBlog, deleteBlog,
  getGallery, addGalleryItem, deleteGalleryItem,
  getProjects, addProject, updateProject, deleteProject,
  uploadImageFile, logout, getCurrentUser 
} from "../lib/cms";
import { 
  LayoutDashboard, FileText, Image as ImageIcon, 
  FolderPlus, LogOut, Plus, Trash2, Edit, Save, X, Upload, Loader2
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Data States
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const user = getCurrentUser();

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [b, p, g] = await Promise.all([getBlogs(), getProjects(), getGallery()]);
        setBlogs(b || []);
        setProjects(p || []);
        setGallery(g || []);
      } catch (err) {
        console.error("❌ Dashboard Load Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  // --- GENERIC HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setActionLoading(true);
      const url = await uploadImageFile(file);
      const imageField = activeTab === "gallery" ? "src" : (activeTab === "blogs" ? "coverImage" : "imageUrl");
      setFormData(prev => ({ ...prev, [imageField]: url }));
    } catch (err) {
      alert("Image upload failed. Try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    // Initialize with empty object with all possible fields
    setFormData(item || { src: '', caption: '', alt: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  // --- CRUD OPERATIONS (THE HEART) ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation for gallery - src is required
    if (activeTab === "gallery" && !formData.src) {
      alert("⚠️ Please upload an image first!");
      return;
    }

    try {
      setActionLoading(true);
      let savedItem;

      if (activeTab === "blogs") {
        savedItem = editingItem 
          ? await updateBlog(editingItem.id, formData)
          : await addBlog(formData);
        setBlogs(prev => editingItem ? prev.map(i => i.id === savedItem.id ? savedItem : i) : [savedItem, ...prev]);
      } 
      else if (activeTab === "projects") {
        savedItem = editingItem 
          ? await updateProject(editingItem.id, formData)
          : await addProject(formData);
        setProjects(prev => editingItem ? prev.map(i => i.id === savedItem.id ? savedItem : i) : [savedItem, ...prev]);
      } 
      else if (activeTab === "gallery") {
        savedItem = await addGalleryItem(formData);
        setGallery(prev => [savedItem, ...prev]);
      }

      closeModal();
    } catch (err) {
      alert(`Error saving ${activeTab}: ` + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action is permanent and stored in the vault.")) return;
    try {
      setActionLoading(true);
      if (activeTab === "blogs") {
        await deleteBlog(id);
        setBlogs(prev => prev.filter(i => i.id !== id));
      } else if (activeTab === "projects") {
        await deleteProject(id);
        setProjects(prev => prev.filter(i => i.id !== id));
      } else if (activeTab === "gallery") {
        await deleteGalleryItem(id);
        setGallery(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
        <p className="text-gray-600 font-medium">Securing Control Center...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-900">
          <h1 className="text-xl font-bold tracking-tight">Dr. Ariful CMS</h1>
          <p className="text-xs text-blue-400 mt-1">Authorized Access Only</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: "blogs", label: "Blog Posts", icon: FileText },
            { id: "projects", label: "Research Projects", icon: FolderPlus },
            { id: "gallery", label: "Gallery Media", icon: ImageIcon },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-blue-800 shadow-inner' : 'hover:bg-blue-900/50 text-blue-100'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium">{user?.email}</span>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add New {activeTab === "blogs" ? "Post" : activeTab === "projects" ? "Project" : "Image"}
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* STAT CARDS */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { label: "Total Blogs", value: blogs.length, color: "bg-emerald-50 text-emerald-700" },
              { label: "Active Projects", value: projects.length, color: "bg-blue-50 text-blue-700" },
              { label: "Gallery Assets", value: gallery.length, color: "bg-amber-50 text-amber-700" },
            ].map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-2xl shadow-sm border border-white/50 ${stat.color}`}>
                <p className="text-sm font-bold opacity-80 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* DATA TABLE / GRID */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === "gallery" ? (
              <div className="p-6 grid grid-cols-4 gap-4">
                {gallery.filter(item => item && item.src).map(item => (
                  <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={item.src} className="w-full h-full object-cover" alt={item.alt || ""} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition-transform hover:scale-110">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(activeTab === "blogs" ? blogs : projects).map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 max-w-md">
                        <div className="font-bold text-gray-900 truncate">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-1">ID: {item.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {activeTab === "blogs" ? item.category : item.status}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {((activeTab === "blogs" && blogs.length === 0) || (activeTab === "projects" && projects.length === 0) || (activeTab === "gallery" && gallery.length === 0)) && (
              <div className="p-20 text-center text-gray-400 italic">No data available in this vault section.</div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL - Unified for all types */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingItem ? "Edit" : "Add New"} {activeTab}</h3>
              <button onClick={closeModal} className="hover:rotate-90 transition-transform"><X /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-gray-700">Title / Caption</span>
                  <input 
                    name={activeTab === "gallery" ? "caption" : "title"}
                    value={activeTab === "gallery" ? formData.caption || '' : formData.title || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:ring-blue-900 focus:border-blue-900 p-3"
                    required
                  />
                </label>

                {activeTab === "blogs" && (
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-bold text-gray-700">Category</span>
                      <input name="category" value={formData.category || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 p-3" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-gray-700">Author</span>
                      <input name="author" value={formData.author || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 p-3" />
                    </label>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-bold text-gray-700">Status</span>
                      <input name="status" value={formData.status || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 p-3" />
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-gray-700">Year</span>
                      <input name="year" value={formData.year || ''} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 p-3" />
                    </label>
                  </div>
                )}

                {activeTab !== "gallery" && (
                  <label className="block">
                    <span className="text-sm font-bold text-gray-700">Content / Description</span>
                    <textarea 
                      name={activeTab === "blogs" ? "content" : "description"} 
                      rows="4" 
                      value={activeTab === "blogs" ? formData.content || '' : formData.description || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 p-3"
                    ></textarea>
                  </label>
                )}

                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-4 bg-gray-50/50">
                  {(formData.src || formData.coverImage || formData.imageUrl) ? (
                    <img src={formData.src || formData.coverImage || formData.imageUrl} className="h-32 rounded-lg" alt="Preview" />
                  ) : (
                    <Upload className="w-10 h-10 text-gray-300" />
                  )}
                  <input type="file" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>

                {activeTab === "projects" && (
                  <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer">
                    <input type="checkbox" name="featured" checked={formData.featured || false} onChange={handleInputChange} className="w-5 h-5 rounded text-blue-900" />
                    <span className="font-bold text-blue-900">Feature this project on Homepage</span>
                  </label>
                )}
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-grow py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="flex-grow py-4 bg-blue-900 text-white rounded-2xl font-bold hover:bg-blue-800 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                  {editingItem ? "Update Changes" : "Save to Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;