// src/lib/cms.js - SAFETY BRIDGE VERSION

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 
  "https://drariful-adminpannel-backend.vercel.app/api"
).replace(/\/$/, "");

const apiRequest = async (path, options = {}) => {
  try {
    const url = `${API_BASE_URL}${path}`;
    const token = localStorage.getItem("adminToken");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    return null;
  }
};

// --- API FUNCTIONS ---
export const getBlogs = async () => (await apiRequest("/blogs")) || [];
export const getGallery = async () => (await apiRequest("/gallery")) || [];
export const getProjects = async () => (await apiRequest("/projects")) || [];

// --- SAFETY BRIDGE (এটি আপনার সাদা স্ক্রিন দূর করবে) ---
// এগুলো খালি রাখছি যাতে পুরাতন ইম্পোর্টগুলো ক্রাশ না করে
export const defaultBlogs = [];
export const defaultGallery = [];
export const defaultProjects = [];

// --- ADMIN ACTIONS ---
export const login = async (email, password) => {
  const data = await apiRequest("/login", { method: "POST", body: JSON.stringify({ email, password }) });
  if (data?.token) {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("mockUser", JSON.stringify(data.user));
    return data.user;
  }
  throw new Error("Invalid Credentials");
};

export const addBlog = (data) => apiRequest("/blogs", { method: "POST", body: JSON.stringify(data) });
export const updateBlog = (id, data) => apiRequest(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBlog = (id) => apiRequest(`/blogs/${id}`, { method: "DELETE" });

export const addGalleryItem = (data) => apiRequest("/gallery", { method: "POST", body: JSON.stringify(data) });
export const deleteGalleryItem = (id) => apiRequest(`/gallery/${id}`, { method: "DELETE" });

export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("key", "81d3a84c4355522a5772250fb757fe39");
  formData.append("image", file);
  const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: formData });
  const json = await res.json();
  return json.data.url;
};