import React, { useState, useEffect } from "react";
import Nav from "../Header/Nav";
import Banner from "../Header/Banner";
import FeaturedProjects from "../components/FeaturedProjects";
import Expertises from "../components/Expertises";
import AcademyHighlight from "../components/AcademyHighlight";
import Footer from "../Footer/Footer";
import { getBlogs, getProjects } from "../lib/cms";

const Home = () => {
  const [counts, setCounts] = useState({ blogs: 0, projects: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadStats = async () => {
      try {
        const blogs = await getBlogs();
        const projects = await getProjects();
        setCounts({ 
          blogs: Array.isArray(blogs) ? blogs.length : 0, 
          projects: Array.isArray(projects) ? projects.length : 0 
        });
      } catch (e) {
        setCounts({ blogs: 0, projects: 0 });
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      <Banner />
      <Expertises />
      <FeaturedProjects />
      <AcademyHighlight />
      <Footer />
    </div>
  );
};
export default Home;