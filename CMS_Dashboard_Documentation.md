# System Architecture & Technical Stack Documentation
### Project: React Headless CMS & Admin Dashboard Integration
**Author:** Rifatuzzaman Rifat  
**Date:** June 17, 2026

---

## 1. Executive Summary
This document outlines the technical stack, architecture, and workflow implemented to integrate a secure Admin Dashboard and Headless CMS into the React portfolio application. The solution enables full content management (Blogs and Clinical Gallery) without modifying code or redeploying the frontend.

---

## 2. Technology Stack

The application utilizes a lightweight, modern, and performant stack designed to load quickly and require zero server-side maintenance costs:

* **Core Framework:** React.js (v18) built on Vite (offering fast Hot Module Replacement and production-optimized builds).
* **Styling & UI Components:** Tailwind CSS & DaisyUI (integrated for premium look-and-feel, responsive layouts, and cross-browser consistency).
* **Routing Engine:** React Router DOM (v7) managing secure route transitions and protected access controls.
* **Database & Auth Engines (Dual-Mode Client):**
  * **Production:** Firebase Auth (Authentication) & Firebase Firestore (Cloud Database).
  * **Fallback:** LocalStorage API (client-side offline simulation).
* **Media Uploads:** Firebase Storage integrated with a client-side HTML5 canvas JPEG compressor (reducing uploaded sizes by up to 80% prior to transmission).

---

## 3. Workflow & Architecture Process

```
                      [ Client Browser ]
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
     [ Public Pages ]                 [ Admin Portal ]
      • Blogs List & Details           • Credentials: admin@drariful.com
      • Clinical Gallery Page          • Route guard checks session state
             │                                 │
             └────────────────┬────────────────┘
                              ▼
                        [ CMS Client ]
                    (src/lib/cms.js Wrapper)
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
   (If Firebase Env Keys Set)       (If Env Keys Missing)
     [ Firebase Firestore ]           [ HTML5 LocalStorage ]
```

### A. Authentication & Route Protection
* **Access Control:** The admin console is accessible via the **"Admin"** link in the navigation header or directly via `/login`.
* **Security Guard:** A route guard checks the authentication token. Any attempt to access `/dashboard` without authorization triggers an automatic redirect to `/login`.
* **Session Persistence:** Login states persist securely using session tokens and Firebase Auth triggers.

### B. Content Management Workflows
The dashboard is split into three main modules:
1. **Overview Stat Panel:** Monitors active collections and reveals the live database engine configuration state.
2. **Blogs Management (CRUD):**
   * **Create:** Publishes posts with Category, Cover Image (URL or uploaded file), and Content.
   * **Edit:** Populate fields and trigger an animated smooth-scroll back to the top form for edits.
   * **Delete:** Remove posts permanently.
3. **Gallery Management (CRUD & Uploads):**
   * **Local Uploads:** Files selected from the computer are processed via `FileReader` and compressed on a 2D canvas to `70%` quality, generating an optimized Base64 data URL (or uploaded to Firebase Storage if active).
   * **Edit & Delete:** Update caption titles, change URLs, or delete gallery photos dynamically.

### C. Live Syncing & Database Seeding
* **Instant Refresh:** Public pages pull live data from the CMS layer on initialization. Adding, editing, or deleting items updates the live views immediately.
* **Smart Auto-Seeding:** If the database (Firestore) is newly connected and contains no documents, the client automatically seeds it with the default 39 clinical images and sample blogs. This ensures a clean out-of-the-box user experience.

---

## 4. Setup & Deployment Guidelines

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Connecting to Cloud Firebase
To switch from LocalStorage Mock mode to Firebase Cloud Database, create a `.env` file in the root directory and add the following keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
The application will automatically detect these keys and switch database calls to the live cloud Firestore instance on page reload.
