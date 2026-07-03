import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogs } from "../lib/cms";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const allBlogs = await getBlogs();
        const foundBlog = allBlogs.find(b => b.id === id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.error("Blog not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading Article...</div>;
  if (!blog) return <div className="p-20 text-center">Article Not Found.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <article className="max-w-4xl mx-auto px-4 py-20">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-8">← Back to Blogs</button>
        <img src={blog.coverImage} alt={blog.title} className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-lg" />
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase">{blog.category}</span>
          <span className="text-gray-500">{blog.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">{blog.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
        <div className="mt-12 p-6 bg-gray-50 rounded-xl border-l-4 border-blue-900">
          <p className="font-bold text-gray-900">Author: {blog.author}</p>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogDetail;