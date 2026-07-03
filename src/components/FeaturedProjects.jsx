/**
 * src/components/FeaturedProjects.jsx - THE SMART FILTER (ULTIMATE VERSION)
 * 1. Automatically pulls projects marked as 'featured' from MongoDB.
 * 2. Safe loading and empty states for Home Page.
 * 3. Zero reliance on data/projects.js.
 */

import React, { useState, useEffect } from "react";
import { getProjects } from "../lib/cms";
import { Link } from "react-router-dom";
import { ArrowRight, Beaker, FlaskConical, Dna } from "lucide-react";

const FeaturedProjects = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const allProjects = await getProjects();
        // ড্যাশবোর্ডে যেগুলোতে 'Feature this project' টিক দেওয়া আছে শুধু সেগুলো আসবে
        const filtered = allProjects.filter(p => p.featured).slice(0, 3);
        setFeatured(filtered);
      } catch (err) {
        console.error("❌ Featured Projects Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return null; // হোমপেজে লোডিং না দেখিয়ে সরাসরি কন্টেন্ট আসা ভালো
  if (featured.length === 0) return null; // প্রজেক্ট না থাকলে সেকশনটি দেখাবেই না

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
          {featured.map((project, idx) => (
            <div key={project.id} className="group flex flex-col">
              <div className="relative h-64 rounded-[32px] overflow-hidden bg-gray-100 mb-8 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-900/10">
                {project.imageUrl ? (
                  <img src={project.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50">
                    <FlaskConical className="w-12 h-12 text-blue-200" />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                    {idx === 0 ? <Dna className="w-5 h-5 text-blue-600" /> : <Beaker className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                {project.summary}
              </p>
              
              <Link to="/blogs" className="mt-auto inline-flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-900 w-fit pb-1 group-hover:gap-4 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;