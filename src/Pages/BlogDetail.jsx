import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaBookOpen } from "react-icons/fa";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { getBlogs } from "../lib/cms";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogs = await getBlogs();
        const foundBlog = blogs.find((b) => b.id.toString() === id.toString());
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.warn("Blog not found for id:", id);
        }
      } catch (error) {
        console.error("Failed to load blog detail:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg text-[#003878]"></div>
            <p className="mt-2 text-gray-500">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Unable to load article
            </h2>
            <p className="primary-text mb-6">
              {error.message || "The backend API is unavailable."}
            </p>
            <Link
              to="/blogs"
              className="px-6 py-2 bg-[#003878] text-white rounded-lg hover:bg-blue-800 transition-all font-semibold"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Nav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Article Not Found
            </h2>
            <p className="primary-text mb-6">
              The article you are looking for might have been deleted or the
              link is incorrect.
            </p>
            <Link
              to="/blogs"
              className="px-6 py-2 bg-[#003878] text-white rounded-lg hover:bg-blue-800 transition-all font-semibold"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <article className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[#003878] hover:text-blue-800 transition-colors font-semibold mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Blogs
          </Link>

          {/* Blog Post Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 p-6 md:p-10">
            {/* Header Info */}
            <div className="mb-6">
              {blog.category && (
                <span className="bg-blue-100 text-[#003878] text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {blog.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#003878] mb-4 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-3">
                <span className="flex items-center gap-2">
                  <FaUser className="text-[#003878]" />{" "}
                  {blog.author || "Dr. DM Ariful Rahman"}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#003878]" /> {blog.date}
                </span>
              </div>
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden mb-8 bg-gray-100 border border-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Content Body */}
            <div className="prose prose-blue max-w-none primary-text leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
