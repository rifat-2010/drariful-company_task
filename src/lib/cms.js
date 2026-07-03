// src/lib/cms.js - FINAL MASTER VERSION
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://drariful-adminpannel-backend.vercel.app/api").replace(/\/$/, "");

const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("adminToken");
  const headers = { "Content-Type": "application/json", ...(token ? { "Authorization": `Bearer ${token}` } : {}) };
  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) return null;
    const data = await response.json();
    // MongoDB _id কে UI এর জন্য id তে রূপান্তর
    if (Array.isArray(data)) return data.map(d => ({ ...d, id: d._id || d.id }));
    if (data && data._id) return { ...data, id: data._id };
    return data;
  } catch (err) { return null; }
};

export const getBlogs = async () => (await apiRequest("/blogs")) || [];
export const getGallery = async () => (await apiRequest("/gallery")) || [];
export const getProjects = async () => (await apiRequest("/projects")) || [];
export const addBlog = (data) => apiRequest("/blogs", { method: "POST", body: JSON.stringify(data) });
export const updateBlog = (id, data) => apiRequest(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBlog = (id) => apiRequest(`/blogs/${id}`, { method: "DELETE" });
export const addGalleryItem = (data) => apiRequest("/gallery", { method: "POST", body: JSON.stringify(data) });
export const deleteGalleryItem = (id) => apiRequest(`/gallery/${id}`, { method: "DELETE" });
export const addProject = (data) => apiRequest("/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id, data) => apiRequest(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id) => apiRequest(`/projects/${id}`, { method: "DELETE" });

export const login = async (email, password) => {
  const data = await apiRequest("/login", { method: "POST", body: JSON.stringify({ email, password }) });
  if (data?.token) {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("mockUser", JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth-change"));
    return data.user;
  }
  throw new Error("Invalid Login");
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("mockUser");
  window.dispatchEvent(new Event("auth-change"));
  window.location.href = "/login";
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem("mockUser") || "null");
export const subscribeToAuth = (callback) => {
  const handler = () => callback(getCurrentUser());
  window.addEventListener("auth-change", handler);
  handler();
  return () => window.removeEventListener("auth-change", handler);
};

export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("key", "81d3a84c4355522a5772250fb757fe39");
  formData.append("image", file);
  const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: formData });
  const json = await res.json();
  return json.success ? json.data.url : "";
};

export const defaultBlogs = [];
export const defaultGallery = [];
export const defaultProjects = [];
export const isFirebaseConfigured = false;