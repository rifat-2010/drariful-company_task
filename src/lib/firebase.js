import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

const isFirebaseConfigured = firebaseKeys.every(
  (key) => typeof key === "string" && key.trim() && key !== "YOUR_API_KEY",
);

const missingFirebaseKeys = [];

let app;
let auth;
let db;
let storage;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("Firebase client initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY")
    missingFirebaseKeys.push("VITE_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain)
    missingFirebaseKeys.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.projectId)
    missingFirebaseKeys.push("VITE_FIREBASE_PROJECT_ID");
  if (!firebaseConfig.storageBucket)
    missingFirebaseKeys.push("VITE_FIREBASE_STORAGE_BUCKET");
  if (!firebaseConfig.messagingSenderId)
    missingFirebaseKeys.push("VITE_FIREBASE_MESSAGING_SENDER_ID");
  if (!firebaseConfig.appId) missingFirebaseKeys.push("VITE_FIREBASE_APP_ID");
  console.log(
    `Firebase env keys missing or invalid. Running in LocalStorage Mock CMS mode. Missing: ${missingFirebaseKeys.join(", ")}`,
  );
}

export { auth, db, storage, isFirebaseConfigured, missingFirebaseKeys };
