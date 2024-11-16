import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ProjectMosaic = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {projects.map((project, index) => (
          <div 
            key={project.p_id}
            className={`relative group cursor-pointer overflow-hidden rounded-xl
              ${index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              ${index % 7 === 0 ? 'md:col-span-2' : ''}
              ${index % 3 === 0 ? 'row-span-2' : ''}`}
            onClick={() => handleProjectClick(project)}
          >
            <img
              src={project.p_images[0]}
              alt={project.p_title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                {project.p_title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.p_title}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedProject.p_description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.p_images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProject.p_title} - ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                ))}
              </div>

              {selectedProject.p_tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.p_tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMosaic;