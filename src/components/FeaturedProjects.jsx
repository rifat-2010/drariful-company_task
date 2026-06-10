import React from 'react'
import { useState } from 'react';
import { FaMicroscope, FaFlask, FaFacebook, FaTimes, FaChevronRight, FaUsers } from 'react-icons/fa';
import { featuredProjects } from '../data/projects';
import image1 from '../assets/MSI.jpg'
import image2 from '../assets/HPV.jpg'
import image3 from '../assets/Facebook.jpg'

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(null);

  // Open project modal
  const openProjectModal = (project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close project modal
  const closeProjectModal = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Get icon for project
  const getProjectIcon = (id) => {
    switch (id) {
      // case 1: return <FaMicroscope size={32} />;
      // case 2: return <FaFlask size={32} />;
      // case 3: return <FaFacebook size={32} />;
      case 1: return image1;
      case 2: return image2;
      case 3: return image3;
      default: return <FaMicroscope size={32} />;
    }
  };

  return (
    <section id="projects" className="mt-8 lg:mt-16 bg-gray-50">
      <div className="">
        <div className="w-11/12 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 heading text-center">Featured Research Projects</h2>
          <p className="mb-5 md:mb-8 text-sm md:text-base text-center primary-text">Highlighted research initiatives and ongoing studies</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Project Header */}
                <div className="h-48 bg-blue-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <div className="text-blue-600">
                      {getProjectIcon(project.id)}
                    </div> */}
                    <img className='w-40 h-40 rounded-full' src={getProjectIcon(project.id)} alt="" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold sub-title">{project.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${project.status === 'Published'
                        ? 'bg-blue-100 text-[#003878]'
                        : 'bg-orange-100 text-[#e88d67]'
                      }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="primary-text mb-4 line-clamp-3 text-justify">{project.summary}</p>

                  <div className="flex items-center primary-text text-sm mb-4">
                    <span className="mr-4">{project.year}</span>
                    <span className="flex items-center">
                      <FaUsers className="mr-1" /> {project.collaborators.length} collaborator{project.collaborators.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center justify-center learn-more-btn"
                  >
                    Learn More <FaChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          {activeProject && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
              <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden h-[500px]">
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 text-[#e88d67] hover:text-[#003878] p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none z-10"
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>

                <div className="h-56 bg-blue-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img className='w-52 h-52 rounded-full' src={getProjectIcon(activeProject.id)} alt="" />
                  </div>
                </div>

                {/* Scrollable Content Container */}
                <div className="p-8 overflow-y-auto h-[calc(500px-14rem)]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{activeProject.title}</h3>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${activeProject.status === 'Published'
                        ? 'bg-blue-100 text-[#003878]'
                        : 'bg-orange-100 text-[#e88d67]'
                      }`}>
                      {activeProject.status}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <span className="mr-4">{activeProject.year}</span>
                  </div>

                  <p className="text-gray-600 mb-6 text-justify">{activeProject.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Collaborators</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {activeProject.collaborators.map((collaborator, index) => (
                        <li key={index}>{collaborator}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={closeProjectModal}
                      className="px-4 py-2 bg-orange-50 sub-title font-semibold rounded-md hover:bg-orange-100 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
