// --- CMS.JS FULL CLEAN VERSION ---
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 
  "https://drariful-adminpannel-backend.vercel.app/api"
).replace(/\/$/, "");

const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("adminToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    if (response.status === 204) return null;
    return await response.json();
  } catch (err) {
    console.error(`Network error at ${path}:`, err.message);
    throw err;
  }
};

// ডাটাবেস থেকে ডাটা আনার ফাংশন (কোনো ডামি ডাটা আর নেই)
export const getBlogs = async () => (await apiRequest("/blogs")) || [];
export const getGallery = async () => (await apiRequest("/gallery")) || [];
export const getProjects = async () => (await apiRequest("/projects")) || [];

// এডমিন অ্যাকশন
export const addBlog = (data) => apiRequest("/blogs", { method: "POST", body: JSON.stringify(data) });
export const updateBlog = (id, data) => apiRequest(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBlog = (id) => apiRequest(`/blogs/${id}`, { method: "DELETE" });

export const addGalleryItem = (data) => apiRequest("/gallery", { method: "POST", body: JSON.stringify(data) });
export const deleteGalleryItem = (id) => apiRequest(`/gallery/${id}`, { method: "DELETE" });

export const addProject = (data) => apiRequest("/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id, data) => apiRequest(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id) => apiRequest(`/projects/${id}`, { method: "DELETE" });

// ইমেজ আপলোড ইউটিলিটি (ImgBB ব্যবহার করাই নিরাপদ)
export const uploadImageFile = async (file) => {
  const IMGBB_API_KEY = "81d3a84c4355522a5772250fb757fe39"; 
  const formData = new FormData();
  formData.append("key", IMGBB_API_KEY);
  formData.append("image", file);
  
  const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: formData });
  const json = await res.json();
  return json.data.url;
};

// Login
export const login = async (email, password) => {
  const data = await apiRequest("/login", { method: "POST", body: JSON.stringify({ email, password }) });
  if (data && data.token) {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("mockUser", JSON.stringify(data.user));
    return data.user;
  }
  throw new Error("Invalid Login");
};

export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("mockUser");
  window.location.href = "/login";
};