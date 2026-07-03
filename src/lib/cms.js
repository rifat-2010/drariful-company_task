/**
 * src/lib/cms.js - THE COMMUNICATION BRIDGE (ULTIMATE VERSION)
 * 1. 0% Dummy Data - 100% Database Driven.
 * 2. Automated ID normalization (_id -> id).
 * 3. Complete Auth functions (login, logout, getCurrentUser, subscribeToAuth).
 */

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 
  "https://drariful-adminpannel-backend.vercel.app/api"
).replace(/\/$/, "");

/**
 * Global logic to normalize MongoDB data for the Frontend.
 * Ensures every document has a string 'id' property.
 */
const normalize = (data) => {
  if (!data) return null;
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      id: item._id?.toString() || item.id?.toString() || ""
    }));
  }
  return {
    ...data,
    id: data._id?.toString() || data.id?.toString() || ""
  };
};

/**
 * Centralized API Request Handler
 */
const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("adminToken");
  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    if (response.status === 204) return null;
    const result = await response.json();
    return normalize(result);
  } catch (err) {
    console.error(`❌ CMS Bridge Error [${path}]:`, err.message);
    throw err;
  }
};

// --- AUTHENTICATION SERVICES ---

export const login = async (email, password) => {
  const data = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data?.token) {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("mockUser", JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth-change"));
    return data.user;
  }
  throw new Error("Invalid admin credentials");
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("mockUser");
  window.dispatchEvent(new Event("auth-change"));
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("mockUser");
    return user ? JSON.parse(user) : null;
  } catch { return null; }
};

export const subscribeToAuth = (callback) => {
  const handler = () => callback(getCurrentUser());
  window.addEventListener("auth-change", handler);
  handler(); // Initial check
  return () => window.removeEventListener("auth-change", handler);
};

// --- BLOG SERVICES ---
export const getBlogs = async () => (await apiRequest("/blogs")) || [];
export const addBlog = (data) => apiRequest("/blogs", { method: "POST", body: JSON.stringify(data) });
export const updateBlog = (id, data) => apiRequest(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBlog = (id) => apiRequest(`/blogs/${id}`, { method: "DELETE" });

// --- GALLERY SERVICES ---
export const getGallery = async () => (await apiRequest("/gallery")) || [];
export const addGalleryItem = (data) => apiRequest("/gallery", { method: "POST", body: JSON.stringify(data) });
export const deleteGalleryItem = (id) => apiRequest(`/gallery/${id}`, { method: "DELETE" });

// --- PROJECT SERVICES ---
export const getProjects = async () => (await apiRequest("/projects")) || [];
export const addProject = (data) => apiRequest("/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id, data) => apiRequest(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id) => apiRequest(`/projects/${id}`, { method: "DELETE" });

// --- IMAGE UPLOAD SERVICE (STABLE IMGBB) ---
export const uploadImageFile = async (file) => {
  const IMGBB_API_KEY = "81d3a84c4355522a5772250fb757fe39"; 
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  formData.append("image", file);
  
  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  if (json.success) return json.data.url;
  throw new Error("Image upload failed.");
};

// --- SAFETY EXPORTS (Prevent Crashes in UI) ---
export const defaultBlogs = [];
export const defaultGallery = [];
export const defaultProjects = [];
export const isFirebaseConfigured = false;