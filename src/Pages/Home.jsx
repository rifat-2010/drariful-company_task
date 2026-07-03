import React, { useState, useEffect } from "react";
import Nav from "../Header/Nav";
import Banner from "../Header/Banner";
import FeaturedProjects from "../components/FeaturedProjects";
import Expertises from "../components/Expertises";
import AcademyHighlight from "../components/AcademyHighlight";
import Footer from "../Footer/Footer";
import { getBlogs, getProjects } from "../lib/cms";
import { Link } from "react-router-dom";

const Home = () => {
  const [counts, setCounts] = useState({ blogs: 0, projects: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCounts = async () => {
      try {
        const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);
        setCounts({ blogs: blogs.length, projects: projects.length });
      } catch (err) {
        console.error("Home stats error:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Banner />
      
      {/* Dynamic Stats Section */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">{counts.projects}+</div>
            <div className="text-blue-200 text-sm">Research Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">{counts.blogs}+</div>
            <div className="text-blue-200 text-sm">Articles Published</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-blue-200 text-sm">IHC Cases Signed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-200 text-sm">Years Experience</div>
          </div>
        </div>
      </section>

      <Expertises />
      <FeaturedProjects />
      <AcademyHighlight />
      
      {/* Latest Blog Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated with Medical Research</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore our latest insights into precision medicine and molecular pathology in Bangladesh.
          </p>
          <Link to="/blogs" className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
            Visit Our Blog
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;