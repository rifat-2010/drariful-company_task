/**
 * src/components/FeaturedProjects.jsx - LATEST BLOGS SECTION
 * 1. Shows latest blogs from MongoDB (not projects)
 * 2. "Read More" goes to specific blog detail page
 * 3. Falls back gracefully if no blogs exist
 */

import React, { useState, useEffect } from "react";
import { getBlogs } from "../lib/cms";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, BookOpen, Newspaper } from "lucide-react";

const FeaturedProjects = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const allBlogs = await getBlogs();
        // Get the 3 most recent blogs
        const latest = allBlogs.slice(0, 3);
        setLatestBlogs(latest);
      } catch (err) {
        console.error("❌ Latest Blogs Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBlogs();
  }, []);

  if (loading) return null;
  if (latestBlogs.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h4 className="text-blue-700 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Latest Research</h4>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Featured Projects</h2>
          </div>
          <Link to="/blogs" className="hidden md:flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-widest group">
            All Publications <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {latestBlogs.map((blog, idx) => (
            <div key={blog.id} className="group flex flex-col">
              <div className="relative h-64 rounded-[32px] overflow-hidden bg-gray-100 mb-8 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-900/10">
                {blog.coverImage ? (
                  <img src={blog.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={blog.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50">
                    <BookOpen className="w-12 h-12 text-blue-200" />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                    {idx === 0 ? <Newspaper className="w-5 h-5 text-blue-600" /> : <FileText className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>
                {blog.category && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-blue-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {blog.content?.substring(0, 150)}...
              </p>
              
              <Link to={`/blogs/${blog.id}`} className="mt-auto inline-flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-900 w-fit pb-1 group-hover:gap-4 transition-all">
                Read More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
