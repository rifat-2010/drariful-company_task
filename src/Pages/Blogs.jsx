import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBookOpen, FaCalendarAlt, FaUser } from "react-icons/fa";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { getBlogs } from "../lib/cms";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category);
  };

  const applyFilters = (term, category) => {
    let result = [...blogs];

    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerCaseTerm) ||
          blog.content.toLowerCase().includes(lowerCaseTerm) ||
          (blog.category &&
            blog.category.toLowerCase().includes(lowerCaseTerm)),
      );
    }

    if (category && category !== "All") {
      result = result.filter((blog) => blog.category === category);
    }

    setFilteredBlogs(result);
  };

  return (
    <div>
      <Nav />
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3 text-center text-[#003878]">
              Medical & Insights Blogs
            </h2>
            <p className="text-[#001A33] max-w-2xl mx-auto">
              Read the latest articles, analysis, and news regarding
              Gynaepathology, Nephropathology, and Molecular Diagnostics in
              Bangladesh.
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blog titles, content, or categories..."
                className="block w-full pl-10 pr-3 py-3 border border-[#003878] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-[#003878]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium sub-title mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-[#003878] text-white"
                        : "bg-gray-100 primary-text hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          {error ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-red-200">
              <p className="text-red-600 text-lg font-semibold mb-3">
                Unable to load blog articles
              </p>
              <p className="text-gray-600 mb-4">
                {error.message || "The backend API is unavailable."}
              </p>
              <p className="text-sm text-gray-500">
                If the deployed CMS backend is not publicly accessible, the page
                cannot fetch MongoDB data.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="loading loading-spinner loading-lg text-[#003878]"></div>
              <p className="mt-2 text-gray-500">Loading articles...</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/600x400/003878/FFF?text=Medical+Insight";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#003878]">
                        <FaBookOpen className="text-5xl" />
                      </div>
                    )}
                    {blog.category && (
                      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold">
                        {blog.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser /> {blog.author || "Dr. DM Ariful Rahman"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="text-[#003878] hover:text-blue-700 transition-colors"
                      >
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="primary-text text-sm mb-6 line-clamp-3 flex-1">
                      {blog.content ? blog.content.replace(/[#*`]/g, "") : ""}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="inline-flex items-center text-sm font-semibold text-[#003878] hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-200"
                      >
                        Read Full Article &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
              <p className="primary-text text-lg mb-4">
                No articles found matching your criteria
              </p>
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setFilteredBlogs(blogs);
                  }}
                  className="px-6 py-2.5 bg-[#003878] text-white rounded-lg hover:bg-blue-800 transition-all font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
