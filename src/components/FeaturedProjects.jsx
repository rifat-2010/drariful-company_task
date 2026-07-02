import React, { useState, useEffect } from "react";
import {
  FaMicroscope,
  FaFlask,
  FaFacebook,
  FaTimes,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";
import { getProjects } from "../lib/cms";
import image1 from "../assets/MSI.jpg";
import image2 from "../assets/HPV.jpg";
import image3 from "../assets/Facebook.jpg";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const data = await getProjects();
        // Filter featured projects
        const featured = data.filter((p) => p.featured === true);
        if (featured.length === 0) {
          // Fallback to top 3 projects
          setProjects(data.slice(0, 3));
        } else {
          setProjects(featured);
        }
      } catch (err) {
        console.error("Error loading featured projects:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProjects();
  }, []);

  // Open project modal
  const openProjectModal = (project) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close project modal
  const closeProjectModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Get image/icon for project
  const getProjectImage = (project) => {
    if (project.imageUrl) return project.imageUrl;
    // Fallback based on id
    if (project.id === "proj_msi" || project.id === 1) return image1;
    if (project.id === "proj_hpv" || project.id === 2) return image2;
    if (project.id === "proj_fb" || project.id === 3) return image3;
    // Fallback based on field
    if (project.field === "Education") return image3;
    if (project.field === "Cancer" || project.field === "Molecular Pathology")
      return image1;
    return image2;
  };

  return (
    <section id="projects" className="mt-8 lg:mt-16 bg-gray-50 py-12">
      <div className="w-11/12 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 heading text-center">
          Featured Research Projects
        </h2>
        <p className="mb-8 text-sm md:text-base text-center primary-text">
          Highlighted research initiatives and ongoing studies
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg text-[#003878]"></span>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl border border-red-200 py-12 text-center">
            <p className="text-red-600 font-semibold text-lg mb-2">
              Unable to load research projects
            </p>
            <p className="text-gray-600">
              {error.message || "The CMS backend API is unavailable."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Header */}
                  <div className="h-48 bg-blue-50 relative overflow-hidden flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-350"
                      src={getProjectImage(project)}
                      alt={project.title}
                      onError={(e) => {
                        e.target.src = image1; // generic fallback
                      }}
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <h3
                        className="text-base font-bold sub-title line-clamp-2"
                        title={project.title}
                      >
                        {project.title}
                      </h3>
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${
                          project.status === "Published" ||
                          project.status === "Completed"
                            ? "bg-blue-100 text-[#003878]"
                            : "bg-orange-100 text-[#e88d67]"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="primary-text mb-4 line-clamp-3 text-justify text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center primary-text text-xs mb-4 font-bold">
                    <span className="mr-4">Duration: {project.year}</span>
                    {project.collaborators &&
                      project.collaborators.length > 0 && (
                        <span className="flex items-center">
                          <FaUsers className="mr-1 text-blue-600" />{" "}
                          {project.collaborators.length} collaborator
                          {project.collaborators.length !== 1 ? "s" : ""}
                        </span>
                      )}
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center justify-center learn-more-btn cursor-pointer w-full text-center font-bold text-sm"
                  >
                    Learn More <FaChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <h3 className="text-xl font-bold text-[#003878] mb-2">
              No research projects found
            </h3>
            <p className="text-gray-500">
              The API returned no project records, so this section is empty.
            </p>
          </div>
        )}

        {/* Project Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 animate-fade-in">
            <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden h-[520px]">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 text-[#e88d67] hover:text-[#003878] p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <div className="h-56 bg-blue-50 relative overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={getProjectImage(activeProject)}
                  alt={activeProject.title}
                />
              </div>

              {/* Scrollable Content Container */}
              <div className="p-8 overflow-y-auto h-[calc(520px-14rem)] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-lg md:text-xl font-extrabold text-gray-900 leading-tight">
                      {activeProject.title}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full shrink-0 ${
                        activeProject.status === "Published" ||
                        activeProject.status === "Completed"
                          ? "bg-blue-100 text-[#003878]"
                          : "bg-orange-100 text-[#e88d67]"
                      }`}
                    >
                      {activeProject.status}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-xs font-bold mb-6 gap-3">
                    <span className="bg-blue-50 text-[#003878] px-2.5 py-1 rounded-full border border-blue-100">
                      Field: {activeProject.field}
                    </span>
                    <span className="bg-gray-100 px-2.5 py-1 rounded-full">
                      Duration: {activeProject.year}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 text-justify text-sm leading-relaxed">
                    {activeProject.description}
                  </p>

                  {activeProject.collaborators &&
                    activeProject.collaborators.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs font-bold mb-2 text-gray-800 uppercase tracking-wider">
                          Collaborators
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          {activeProject.collaborators.map(
                            (collaborator, index) => (
                              <li key={index}>{collaborator}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={closeProjectModal}
                    className="px-5 py-2 bg-orange-50 hover:bg-orange-100 text-[#e88d67] font-bold rounded-lg transition-colors cursor-pointer text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
