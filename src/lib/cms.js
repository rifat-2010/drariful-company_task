import { isFirebaseConfigured, auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

// Seed Data
const defaultGallery = [
  { id: "1", src: 'https://i.ibb.co.com/vxkL5zL1/associate-professor2.jpg', alt: 'Delivering speech in the world cancer day' },
  { id: "2", src: 'https://i.ibb.co.com/SX6bSvpW/workshop-2.jpg', alt: 'Working with the oncology department of TMSS Medical College' },
  { id: "3", src: 'https://i.ibb.co.com/9kqDMBgS/associate3.jpg', alt: 'Agreement Signing Ceremony' },
  { id: "4", src: 'https://i.ibb.co.com/Csmb3hQy/assistant-professior.jpg', alt: 'Working with MiHealthOmics, Australia, to establish the molecular lab' },
  { id: "5", src: 'https://i.ibb.co.com/nqv1n827/lab-leadership.jpg', alt: 'Working to establish a digital pathology platform' },
  { id: "6", src: 'https://i.ibb.co.com/8CKNbsJ/lab-director.jpg', alt: 'After completion of a successful ISO inspection' },
  { id: "7", src: 'https://i.ibb.co.com/yFksj4Z9/workshop-2.jpg', alt: 'After completion of a successful ISO inspection' },
  { id: "8", src: 'https://i.ibb.co.com/5XRRfFNv/workshop-3.jpg', alt: 'Seminar' },
  { id: "9", src: 'https://i.ibb.co.com/39n8Sz85/workshop.jpg', alt: 'In Biomolecular conference room' },
  { id: "10", src: 'https://i.ibb.co.com/pjt7WF07/clinical-experience.jpg', alt: 'Doing more thousands of image guided and non guided core biopsies alongside the radiologist' },
  { id: "11", src: 'https://i.ibb.co.com/JRhKsDQW/public-engage.jpg', alt: 'Seminar on "Why we need a Biomolecular laboratory"' },
  { id: "12", src: 'https://i.ibb.co.com/LXZdgyHL/public-engage2.jpg', alt: 'Seminar on "Why we need a Biomolecular laboratory"' },
  { id: "13", src: 'https://i.ibb.co.com/Ldjxrsq8/public-engage-3.jpg', alt: 'Working on the field of precision cancer medicine' },
  { id: "14", src: 'https://i.ibb.co.com/RkPt9vK4/clinical-experience2.jpg', alt: 'Signed out more than 500 immunohistochemistry cases' },
  { id: "15", src: 'https://i.ibb.co.com/d4cLMwff/2025-05-10.jpg', alt: 'Inspection of ISO experts in molecular lab' },
  { id: "16", src: 'https://i.ibb.co.com/HJ8BhbJ/2025-05-10.jpg', alt: 'Dedicated for patients wellbeing' },
  { id: "17", src: 'https://i.ibb.co.com/jkHyK59g/Whats-App-Image-2025-05-10-at-19-42-22-3d0c34b2.jpg', alt: 'With ISO expert Dr Patric Mateta and Oncologist Dr. Paul Mainwaring, MD, FRCPA' },
  { id: "18", src: 'https://i.ibb.co.com/7NnCV3VN/18.jpg', alt: 'With renowned breast surgeon of NHS, UK; Dr SK Farid Ahmed' },
  { id: "19", src: 'https://i.ibb.co.com/p6QFsM7Q/19.jpg', alt: 'In the histopathology microscopy room' },
  { id: "20", src: 'https://i.ibb.co.com/67SzKG0q/20.jpg', alt: 'With Professor MH Alamgir Pavel, honourable executive advisor of TMSS' },
  { id: "21", src: 'https://i.ibb.co.com/cK0RVjKx/21.jpg', alt: 'Briefing about the molecular lab with Ekhon TV' },
  { id: "22", src: 'https://i.ibb.co.com/Vc1HPf4B/22.jpg', alt: 'Australian trained biomolecular team' },
  { id: "23", src: 'https://i.ibb.co.com/Z1Rt8mYQ/23.jpg', alt: 'In Biomolecular conference room' },
  { id: "24", src: 'https://i.ibb.co.com/DfJfvCjy/24.jpg', alt: 'Session Moderator in the 10th international public health conference' },
  { id: "25", src: 'https://i.ibb.co.com/xSTJTn0m/25.jpg', alt: 'Mentoring the MBBS students' },
  { id: "26", src: 'https://i.ibb.co.com/0yRQWGDv/26.jpg', alt: 'Delivering speech in front of medicine and allied doctors regarding the pathological aspect of image guided intervention' },
  { id: "27", src: 'https://i.ibb.co.com/GvzQMbXd/27.jpg', alt: 'Leading the energetic TBL team' },
  { id: "28", src: 'https://i.ibb.co.com/LVbffYm/28.jpg', alt: 'Expert panel in the seminar of " Reverse aging"' },
  { id: "29", src: 'https://i.ibb.co.com/WvY2QrJ3/29.jpg', alt: 'Working as supervisor of MD phase B residents' },
  { id: "30", src: 'https://i.ibb.co.com/YrJ3Vh4/30.jpg', alt: 'Foreign delegates from the USA in front of Biomolecular lab' },
  { id: "31", src: 'https://i.ibb.co.com/tVsqvHz/Whats-App-Image-2025-05-15-at-13-04-19-8a67fb38.jpg', alt: 'Delivering speech in SZMCH' },
  { id: "32", src: 'https://i.ibb.co.com/Hp4P3JwS/Whats-App-Image-2025-05-15-at-13-04-18-ce8fa643.jpg', alt: 'CT guided core biopsy with radiology-team' },
  { id: "33", src: 'https://i.ibb.co.com/gFHsZKWM/Whats-App-Image-2025-05-15-at-13-04-18-740d433f.jpg', alt: 'Networking meeting between TMSS and Xing Holdings, Australia' },
  { id: "34", src: 'https://i.ibb.co.com/ymyYvff2/Whats-App-Image-2025-05-15-at-13-04-19-591c2270.jpg', alt: 'With the honorable Executive Director of TMSS, Dr. Hosne Ara Begum' },
  { id: "35", src: 'https://i.ibb.co.com/PZ3y0bhR/Whats-App-Image-2025-05-15-at-13-04-20-760acfb2.jpg', alt: 'Visit of renowned hematopathologist Dr Sumeet Gujral from Tata Memorial Hospital, Mumbai' },
  { id: "36", src: 'https://i.ibb.co.com/MkFNgPyY/Whats-App-Image-2025-05-15-at-13-04-19-5bc94ac9.jpg', alt: 'In the Histopathology lab' },
  { id: "37", src: 'https://i.ibb.co.com/krjy0xH/Whats-App-Image-2025-05-15-at-13-04-20-77382b02.jpg', alt: 'CT guided bone biopsy with the radiology team' },
  { id: "38", src: 'https://i.ibb.co.com/Ldj6gHYC/Whats-App-Image-2025-05-15-at-13-04-21-465657ba.jpg', alt: 'Celebrating 1st HRD molecular testing in Bangladesh' },
  { id: "39", src: 'https://i.ibb.co.com/nqMrMXQB/Whats-App-Image-2025-05-15-at-13-04-21-da6043b4.jpg', alt: 'With the delegates from Rajshahi Medical University' }
];

const defaultBlogs = [
  {
    id: "blog1",
    title: "Advancement of Precision Cancer Medicine in Bangladesh",
    coverImage: "https://i.ibb.co.com/nqv1n827/lab-leadership.jpg",
    category: "Precision Medicine",
    content: `Precision medicine is transforming cancer care globally. By analyzing the genetic profile of a patient's tumor, oncologists can select therapies that are specifically designed to target the mutations driving the cancer's growth. 

In Bangladesh, we are making significant strides in establishing biomolecular laboratories to provide these cutting-edge diagnostic tests locally. Previously, tissue samples were sent abroad for molecular profiling, which was expensive and time-consuming. Today, with state-of-the-art facilities like the TMSS Biomolecular Lab, we are performing HRD testing and immunohistochemistry panels in-country.

This article reviews the current state of precision cancer medicine in Bangladesh, the challenges of infrastructure development, and the future outlook for genomic diagnostics in oncology.`,
    author: "Dr. DM Ariful Rahman",
    date: "2026-05-15"
  },
  {
    id: "blog2",
    title: "Understanding Immunohistochemistry (IHC) in Tumor Pathology",
    coverImage: "https://i.ibb.co.com/p6QFsM7Q/19.jpg",
    category: "Pathology",
    content: `Immunohistochemistry (IHC) is a vital tool in modern diagnostic pathology. It involves using labeled antibodies to detect specific proteins (antigens) in cells within a tissue section.

For oncologists, IHC is crucial because it helps:
1. Distinguish between different types of cancer (e.g., carcinoma vs. lymphoma).
2. Determine the primary site of a metastatic tumor.
3. Identify prognostic and predictive biomarkers (such as HER2, ER, PR in breast cancer, or PD-L1 in immunotherapy selection).

With over 500 IHC cases signed out under our digital pathology and molecular initiatives, we have seen firsthand how accurate IHC staining can refine a patient's diagnosis and optimize their treatment pathway.`,
    author: "Dr. DM Ariful Rahman",
    date: "2026-04-22"
  }
];

// Helper to initialize localStorage if not already done
const initLocalStorage = () => {
  if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
  }
  if (!localStorage.getItem("gallery")) {
    localStorage.setItem("gallery", JSON.stringify(defaultGallery));
  }
};

// Initialize right away for mock operations
initLocalStorage();

/**
 * AUTHENTICATION SERVICES
 */
export const login = async (email, password) => {
  if (isFirebaseConfigured) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    }
  } else {
    // Local fallback check
    if (email === "admin@drariful.com" && password === "adminpassword") {
      const user = { email: "admin@drariful.com", uid: "mock-admin-uid" };
      localStorage.setItem("mockUser", JSON.stringify(user));
      // Dispatch custom event to update subscribers immediately
      window.dispatchEvent(new Event("auth-change"));
      return user;
    } else {
      throw new Error("Invalid admin credentials");
    }
  }
};

export const logout = async () => {
  if (isFirebaseConfigured) {
    await signOut(auth);
  } else {
    localStorage.removeItem("mockUser");
    window.dispatchEvent(new Event("auth-change"));
  }
};

export const getCurrentUser = () => {
  if (isFirebaseConfigured) {
    return auth.currentUser;
  } else {
    try {
      const userStr = localStorage.getItem("mockUser");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }
};

export const subscribeToAuth = (callback) => {
  if (isFirebaseConfigured) {
    return onAuthStateChanged(auth, callback);
  } else {
    // Handle mock auth change subscribing
    const handler = () => {
      callback(getCurrentUser());
    };
    window.addEventListener("auth-change", handler);
    // Initial trigger
    handler();
    return () => window.removeEventListener("auth-change", handler);
  }
};

/**
 * BLOG SERVICES
 */
export const getBlogs = async () => {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, "blogs"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const blogsList = [];
      querySnapshot.forEach((docSnap) => {
        blogsList.push({ id: docSnap.id, ...docSnap.data() });
      });
      return blogsList;
    } catch (err) {
      console.error("Firestore getBlogs failed, falling back to LocalStorage:", err);
    }
  }
  
  // LocalStorage Fallback
  initLocalStorage();
  const blogsStr = localStorage.getItem("blogs");
  const list = JSON.parse(blogsStr || "[]");
  return list.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const addBlog = async (blogData) => {
  const newBlog = {
    ...blogData,
    date: new Date().toISOString().split("T")[0]
  };

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, "blogs"), newBlog);
      return { id: docRef.id, ...newBlog };
    } catch (err) {
      console.error("Firestore addBlog failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  newBlog.id = "blog_" + Date.now();
  blogs.unshift(newBlog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  return newBlog;
};

export const updateBlog = async (id, blogData) => {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, blogData);
      return { id, ...blogData };
    } catch (err) {
      console.error("Firestore updateBlog failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const index = blogs.findIndex((b) => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...blogData };
    localStorage.setItem("blogs", JSON.stringify(blogs));
    return blogs[index];
  }
  throw new Error("Blog not found");
};

export const deleteBlog = async (id) => {
  if (isFirebaseConfigured) {
    try {
      await deleteDoc(doc(db, "blogs", id));
      return true;
    } catch (err) {
      console.error("Firestore deleteBlog failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
  const filtered = blogs.filter((b) => b.id !== id);
  localStorage.setItem("blogs", JSON.stringify(filtered));
  return true;
};

/**
 * GALLERY SERVICES
 */
export const getGallery = async () => {
  if (isFirebaseConfigured) {
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const galleryList = [];
      querySnapshot.forEach((docSnap) => {
        galleryList.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (galleryList.length > 0) {
        return galleryList;
      }
    } catch (err) {
      console.error("Firestore getGallery failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const galleryStr = localStorage.getItem("gallery");
  return JSON.parse(galleryStr || "[]");
};

export const addGalleryItem = async (itemData) => {
  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, "gallery"), itemData);
      return { id: docRef.id, ...itemData };
    } catch (err) {
      console.error("Firestore addGalleryItem failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const gallery = JSON.parse(localStorage.getItem("gallery") || "[]");
  const newItem = {
    id: "gallery_" + Date.now(),
    ...itemData
  };
  gallery.unshift(newItem);
  localStorage.setItem("gallery", JSON.stringify(gallery));
  return newItem;
};

export const updateGalleryItem = async (id, itemData) => {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, "gallery", id);
      await updateDoc(docRef, itemData);
      return { id, ...itemData };
    } catch (err) {
      console.error("Firestore updateGalleryItem failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const gallery = JSON.parse(localStorage.getItem("gallery") || "[]");
  const index = gallery.findIndex((img) => img.id.toString() === id.toString());
  if (index !== -1) {
    gallery[index] = { ...gallery[index], ...itemData };
    localStorage.setItem("gallery", JSON.stringify(gallery));
    return gallery[index];
  }
  throw new Error("Gallery item not found");
};

export const deleteGalleryItem = async (id) => {
  if (isFirebaseConfigured) {
    try {
      await deleteDoc(doc(db, "gallery", id));
      return true;
    } catch (err) {
      console.error("Firestore deleteGalleryItem failed, falling back to LocalStorage:", err);
    }
  }

  // LocalStorage Fallback
  initLocalStorage();
  const gallery = JSON.parse(localStorage.getItem("gallery") || "[]");
  const filtered = gallery.filter((img) => img.id.toString() !== id.toString());
  localStorage.setItem("gallery", JSON.stringify(filtered));
  return true;
};
