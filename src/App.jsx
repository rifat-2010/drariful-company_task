import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Resume from "./Pages/Resume";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Publications from "./Pages/Publications";
import Academy from "./Pages/Academy";
import GalleryPage from "./Pages/GalleryPage";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDetail";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
        // errorElement: <div>Page is error</div>
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/resume",
        element: <Resume/>,
      },
      {
        path: "/publication",
        element: <Publications />,
      },
      {
        path: "/academy",
        element: <Academy />, 
      },
      {
        path: "/gallery",
        element: <GalleryPage/>, 
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      }
    ]);
    return (
      <>
        <RouterProvider router={router}>

        </RouterProvider>
      </>
    );
  }
}

export default App;
