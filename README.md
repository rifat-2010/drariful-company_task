# Dr. Ariful Rahman Portfolio & CMS

A modern professional portfolio website for Dr. Ariful Rahman, built with React, Vite, Tailwind CSS, and a MongoDB-backed CMS API. The project includes a public portfolio site, a CMS/admin dashboard, blog management, gallery management, and research project management.

## Live Links

- Frontend: https://drariful-protfolio.netlify.app/
- Backend API: https://drariful-adminpannel-backend-f7m3i1bt0.vercel.app

## Overview

This project is designed to showcase:

- Professional background and academic experience
- Publications, books, and achievements
- Gallery of professional activities and events
- Research projects and current initiatives
- A lightweight content management dashboard for updating site content

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: Firebase Auth (with a local fallback for development)
- Hosting: Netlify for frontend, Vercel for backend

## Features

- Responsive portfolio pages for Home, About, Resume, Publications, Gallery, Blogs, and Contact
- CMS dashboard to manage blogs, gallery items, and research projects
- Live API-driven content delivery from MongoDB
- Fallback behavior for offline or missing backend scenarios
- Professional UI with modern styling and reusable components

## Project Structure

- src/ — frontend application source
- src/Pages/ — main page components
- src/components/ — reusable UI sections
- src/lib/ — CMS and API helper modules
- server/ — backend API and database seeding logic

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
```

From the server folder:

```bash
cd server
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

### 3. Start the backend

```bash
cd server
npm start
```

The backend API will be available at:

- http://localhost:5000/
- http://localhost:5000/api/health
- http://localhost:5000/api/blogs
- http://localhost:5000/api/gallery
- http://localhost:5000/api/projects

## Environment Variables

### Frontend

Create a .env file in the project root if needed:

```bash
VITE_API_BASE_URL=https://drariful-adminpannel-backend-f7m3i1bt0.vercel.app/api
```

### Backend

Create a server/.env file with your MongoDB credentials:

```bash
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_CLUSTER=your_cluster_url_without_https
DB_NAME=drariful_cms
PORT=5000
```

## Deployment Notes

### Frontend (Netlify)

- Deploy the root project folder to Netlify
- Set the build command to:

```bash
npm run build
```

- Set the publish directory to:

```bash
dist
```

### Backend (Vercel)

- Deploy the server folder to Vercel
- Use the Vercel configuration provided in server/vercel.json
- Add the backend environment variables in Vercel project settings

## CMS and Admin Notes

- The admin dashboard is connected to the backend API for blogs, gallery items, and projects
- If the API is unavailable, the app falls back to browser localStorage so the interface remains usable
- For production use, ensure the live backend URL is correctly configured in the frontend environment variables

## License

This project is intended for personal/professional portfolio use.
