import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../lib/cms";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Latest updates on precision medicine, tumor pathology, and medical education in Bangladesh.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.coverImage || "https://via.placeholder.com/800x400?text=No+Image"} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase">
                      {blog.category}
                    </span>
                    <span className="text-gray-500 text-xs">{blog.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
                    {blog.content}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-500">By {blog.author}</span>
                    <Link 
                      to={`/blog/${blog.id}`} 
                      className="text-blue-600 font-semibold text-sm hover:text-blue-800"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-600">No blog posts found.</h3>
            <p className="text-gray-500 mt-2">New content will be available soon.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;