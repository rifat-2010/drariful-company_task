import React, { useState, useEffect } from "react";
import { getProjects } from "../lib/cms";
import { Link } from "react-router-dom";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProjects();
        // শুধুমাত্র Featured প্রজেক্টগুলো ফিল্টার করে নেওয়া হচ্ছে
        setProjects(data.filter(p => p.featured).slice(0, 3)); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return null;
  if (projects.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.summary}</p>
                <Link to="/publications" className="text-blue-600 font-semibold hover:underline">View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;