import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaPlus,
  FaTrashAlt,
  FaEdit,
  FaImage,
  FaFileAlt,
  FaChartBar,
  FaDatabase,
  FaTimes,
  FaLink
} from 'react-icons/fa';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import {
  getCurrentUser,
  subscribeToAuth,
  logout,
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadImageFile
} from '../lib/cms';
import { isFirebaseConfigured } from '../lib/firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States - Blogs
  const [blogForm, setBlogForm] = useState({ id: '', title: '', category: '', coverImage: '', content: '' });
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [blogSubmitLoading, setBlogSubmitLoading] = useState(false);

  // Form States - Gallery
  const [galleryForm, setGalleryForm] = useState({ src: '', alt: '' });
  const [gallerySubmitLoading, setGallerySubmitLoading] = useState(false);

  // Upload States
  const [blogImageLoading, setBlogImageLoading] = useState(false);
  const [galleryImageLoading, setGalleryImageLoading] = useState(false);

  // Image Upload Handler
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'blog') {
      setBlogImageLoading(true);
      try {
        const url = await uploadImageFile(file);
        setBlogForm(prev => ({ ...prev, coverImage: url }));
      } catch (err) {
        alert("Upload failed: " + err.message);
      } finally {
        setBlogImageLoading(false);
      }
    } else {
      setGalleryImageLoading(true);
      try {
        const url = await uploadImageFile(file);
        setGalleryForm(prev => ({ ...prev, src: url }));
      } catch (err) {
        alert("Upload failed: " + err.message);
      } finally {
        setGalleryImageLoading(false);
      }
    }
  };

  // Auth Protection
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Load CMS Data
  const loadData = async () => {
    setLoading(true);
    try {
      const blogsData = await getBlogs();
      const galleryData = await getGallery();
      setBlogs(blogsData);
      setGallery(galleryData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Actions - Logout
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Actions - Blog Save
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogSubmitLoading(true);
    try {
      if (blogForm.id) {
        // Edit mode
        await updateBlog(blogForm.id, {
          title: blogForm.title,
          category: blogForm.category,
          coverImage: blogForm.coverImage,
          content: blogForm.content
        });
      } else {
        // Create mode
        await addBlog({
          title: blogForm.title,
          category: blogForm.category,
          coverImage: blogForm.coverImage,
          content: blogForm.content
        });
      }
      setIsBlogFormOpen(false);
      setBlogForm({ id: '', title: '', category: '', coverImage: '', content: '' });
      await loadData();
    } catch (err) {
      alert("Error saving blog: " + err.message);
    } finally {
      setBlogSubmitLoading(false);
    }
  };

  // Actions - Blog Edit Trigger
  const handleEditBlog = (blog) => {
    setBlogForm({
      id: blog.id,
      title: blog.title,
      category: blog.category || '',
      coverImage: blog.coverImage || '',
      content: blog.content || ''
    });
    setIsBlogFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actions - Blog Delete
  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        await loadData();
      } catch (err) {
        alert("Error deleting blog: " + err.message);
      }
    }
  };

  // Actions - Gallery Save
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.src || !galleryForm.alt) {
      alert("Please enter image URL and a caption.");
      return;
    }
    setGallerySubmitLoading(true);
    try {
      if (galleryForm.id) {
        await updateGalleryItem(galleryForm.id, {
          src: galleryForm.src,
          alt: galleryForm.alt
        });
      } else {
        await addGalleryItem({
          src: galleryForm.src,
          alt: galleryForm.alt
        });
      }
      setGalleryForm({ id: '', src: '', alt: '' });
      await loadData();
    } catch (err) {
      alert("Error saving gallery item: " + err.message);
    } finally {
      setGallerySubmitLoading(false);
    }
  };

  // Actions - Gallery Edit Trigger
  const handleEditGallery = (item) => {
    setGalleryForm({
      id: item.id,
      src: item.src,
      alt: item.alt
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actions - Gallery Delete
  const handleDeleteGallery = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery image?")) {
      try {
        await deleteGalleryItem(id);
        await loadData();
      } catch (err) {
        alert("Error deleting gallery item: " + err.message);
      }
    }
  };

  if (!user) return null;

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Panel */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between border border-gray-200">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold heading">Admin Command Center</h1>
              <p className="primary-text text-sm mt-1">
                Signed in as: <span className="font-semibold text-[#003878]">{user.email}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                isFirebaseConfigured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                <FaDatabase /> {isFirebaseConfigured ? 'Firebase Active' : 'LocalStorage Mock CMS'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors border border-red-200"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>

          {/* Grid Layout: Sidebar Tabs & Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Nav */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 h-fit">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-50 text-[#003878]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaChartBar /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'blogs'
                      ? 'bg-blue-50 text-[#003878]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaFileAlt /> Manage Blogs
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'gallery'
                      ? 'bg-blue-50 text-[#003878]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaImage /> Manage Gallery
                </button>
              </nav>
            </div>

            {/* Main Editor Panel */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
                  <span className="loading loading-spinner loading-lg text-[#003878]"></span>
                  <p className="mt-2 text-gray-500">Loading database data...</p>
                </div>
              ) : (
                <>
                  {/* OVERVIEW TAB */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-center gap-5">
                          <div className="p-4 bg-blue-50 text-[#003878] rounded-xl">
                            <FaFileAlt className="text-3xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Blog Posts</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{blogs.length}</h3>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-center gap-5">
                          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                            <FaImage className="text-3xl" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Gallery Images</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{gallery.length}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FaDatabase className="text-[#003878]" /> Database Configuration Info
                        </h2>
                        <div className="prose prose-sm text-gray-600 max-w-none space-y-2">
                          <p>
                            The site uses a unified CMS module located at <code>src/lib/cms.js</code>.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-xs font-mono space-y-1">
                            <p><strong>Configured Mode:</strong> {isFirebaseConfigured ? 'Production Firebase Client (Firestore)' : 'LocalStorage Fallback Client'}</p>
                            <p><strong>Database Source:</strong> {isFirebaseConfigured ? 'Firestore database instances' : 'Browser HTML5 LocalStorage'}</p>
                            <p><strong>Authorized Admin Account:</strong> admin@drariful.com</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-4">
                            Note: To configure production Firestore keys, provide your Firebase project API keys in a <code>.env</code> file under <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_PROJECT_ID</code>, and <code>VITE_FIREBASE_APP_ID</code>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BLOGS MANAGEMENT TAB */}
                  {activeTab === 'blogs' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Manage Blog Posts</h2>
                        <button
                          onClick={() => {
                            setBlogForm({ id: '', title: '', category: '', coverImage: '', content: '' });
                            setIsBlogFormOpen(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-[#003878] hover:bg-blue-800 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
                        >
                          <FaPlus /> Write New Post
                        </button>
                      </div>

                      {/* Blog Form / Edit (Inline Form) */}
                      {isBlogFormOpen && (
                        <div className="p-6 bg-blue-50/50 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-extrabold text-gray-900">
                              {blogForm.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                            </h3>
                            <button
                              onClick={() => setIsBlogFormOpen(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FaTimes />
                            </button>
                          </div>

                          <form onSubmit={handleBlogSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                                <input
                                  type="text"
                                  required
                                  value={blogForm.title}
                                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                  placeholder="Post title"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                                <input
                                  type="text"
                                  required
                                  value={blogForm.category}
                                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                                  placeholder="e.g. Pathology, Precision Medicine"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cover Image</label>
                              <div className="flex flex-col md:flex-row gap-4 items-start">
                                <div className="flex-1 w-full">
                                  <input
                                    key={blogForm.id || 'new'}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'blog')}
                                    className="block w-full text-sm text-gray-500 bg-white border border-gray-300 rounded-lg p-1.5 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#003878] hover:file:bg-blue-100 cursor-pointer"
                                  />
                                  {blogImageLoading && (
                                    <div className="text-xs text-blue-600 mt-1 flex items-center gap-1 font-semibold">
                                      <span className="loading loading-spinner loading-xs"></span> Processing/Uploading image...
                                    </div>
                                  )}
                                  <div className="text-xs text-gray-400 mt-2">Or paste a cover image URL:</div>
                                  <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 text-sm">
                                      <FaLink />
                                    </span>
                                    <input
                                      type="text"
                                      value={blogForm.coverImage}
                                      onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                                      placeholder="https://example.com/image.jpg"
                                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                  </div>
                                </div>
                                {blogForm.coverImage && (
                                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 shadow-sm">
                                    <img src={blogForm.coverImage} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Content Body</label>
                              <textarea
                                required
                                rows={8}
                                value={blogForm.content}
                                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                placeholder="Write your post content here..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>

                            <div className="flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setIsBlogFormOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={blogSubmitLoading}
                                className="px-4 py-2 bg-[#003878] hover:bg-blue-800 text-white rounded-lg text-sm font-bold disabled:bg-gray-400"
                              >
                                {blogSubmitLoading ? 'Saving...' : 'Save Post'}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Blogs list */}
                      <div className="overflow-x-auto">
                        {blogs.length > 0 ? (
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      {blog.coverImage && (
                                        <img src={blog.coverImage} className="w-10 h-10 object-cover rounded-md mr-3 border border-gray-200" alt="" />
                                      )}
                                      <div className="text-sm font-bold text-gray-900 max-w-[250px] truncate">{blog.title}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                      {blog.category}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {blog.date}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() => handleEditBlog(blog)}
                                      className="text-blue-600 hover:text-blue-950 mr-4 inline-flex items-center gap-1 font-semibold"
                                    >
                                      <FaEdit /> Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBlog(blog.id)}
                                      className="text-red-600 hover:text-red-950 inline-flex items-center gap-1 font-semibold"
                                    >
                                      <FaTrashAlt /> Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            No blog posts found. Write a new post to get started!
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GALLERY MANAGEMENT TAB */}
                  {activeTab === 'gallery' && (
                    <div className="space-y-6">
                      {/* Add Gallery Item Card */}
                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          {galleryForm.id ? <FaEdit className="text-[#003878]" /> : <FaPlus className="text-[#003878]" />} 
                          {galleryForm.id ? 'Edit Photo in Clinical Gallery' : 'Add Photo to Clinical Gallery'}
                        </h2>
                        <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image Source</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="flex-1 w-full">
                                <input
                                  key={galleryForm.id || 'new'}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, 'gallery')}
                                  className="block w-full text-sm text-gray-500 bg-white border border-gray-300 rounded-lg p-1.5 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#003878] hover:file:bg-blue-100 cursor-pointer"
                                />
                                {galleryImageLoading && (
                                  <div className="text-xs text-blue-600 mt-1 flex items-center gap-1 font-semibold">
                                    <span className="loading loading-spinner loading-xs"></span> Processing...
                                  </div>
                                )}
                                <div className="text-xs text-gray-400 mt-2">Or paste image URL:</div>
                                <div className="relative mt-1">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaLink />
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    value={galleryForm.src}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                                    placeholder="https://i.ibb.co/..."
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                  />
                                </div>
                              </div>
                              {galleryForm.src && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 self-center shadow-sm">
                                  <img src={galleryForm.src} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Caption / Description</label>
                            <input
                              type="text"
                              required
                              value={galleryForm.alt}
                              onChange={(e) => setGalleryForm({ ...galleryForm, alt: e.target.value })}
                              placeholder="e.g. Agreement Signing Ceremony"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-2"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={gallerySubmitLoading}
                              className="flex-1 flex justify-center items-center gap-2 py-2 px-4 bg-[#003878] hover:bg-blue-800 text-white rounded-lg text-sm font-bold transition-colors disabled:bg-gray-400"
                            >
                              {galleryForm.id ? 'Update Image' : 'Add Image'}
                            </button>
                            {galleryForm.id && (
                              <button
                                type="button"
                                onClick={() => setGalleryForm({ id: '', src: '', alt: '' })}
                                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Gallery Grid display with Deletes */}
                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Current Gallery Items ({gallery.length})</h2>
                        {gallery.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {gallery.map((img) => (
                              <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex flex-col">
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  className="w-full h-36 object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://placehold.co/300x200?text=Invalid+Image';
                                  }}
                                />
                                <div className="p-3 flex-1 flex flex-col justify-between">
                                  <p className="text-xs font-bold text-gray-800 line-clamp-2">{img.alt}</p>
                                  <div className="mt-3 flex justify-between items-center">
                                    <button
                                      onClick={() => handleEditGallery(img)}
                                      className="text-xs font-bold text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                                    >
                                      <FaEdit /> Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteGallery(img.id)}
                                      className="text-xs font-bold text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                                    >
                                      <FaTrashAlt /> Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            No gallery images found. Add some images above to populate the clinical gallery.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
