import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const inspiringQuotes = [
  { text: "Design is intelligence made visible", author: "Alina Wheeler" },
  { text: "Simplicity is the ultimate sophistication", author: "Leonardo da Vinci" },
  { text: "Creativity takes courage", author: "Henri Matisse" },
  { text: "Less is more", author: "Ludwig Mies van der Rohe" },
  { text: "Think more, design less", author: "Ellen Lupton" }
];

const ProjectMosaic = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <div 
            key={project.p_id}
            className={`relative group cursor-pointer overflow-hidden rounded-xl aspect-square
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
        {/* Fill empty spaces with quotes */}
        {Array.from({ length: Math.max(0, 12 - projects.length) }).map((_, index) => (
          <div key={`quote-${index}`} className="relative aspect-square bg-gray-100 rounded-xl p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-700 font-medium italic">"{inspiringQuotes[index % inspiringQuotes.length].text}"</p>
              <p className="text-gray-500 text-sm mt-2">- {inspiringQuotes[index % inspiringQuotes.length].author}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-white rounded-xl max-w-6xl w-full h-[90vh] flex overflow-hidden">
            {/* Left side - Scrollable Images */}
            <div className="w-1/2 h-full overflow-y-auto p-4 border-r border-gray-200">
              {selectedProject.p_images.map((image, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <img
                    src={image}
                    alt={`${selectedProject.p_title} - ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            {/* Right side - Fixed Content */}
            <div className="w-1/2 h-full p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="h-full flex flex-col">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.p_title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{selectedProject.p_description}</p>
                
                {selectedProject.p_tags && (
                  <div className="flex flex-wrap gap-2">
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
        </div>
      )}
    </div>
  );
};

export default ProjectMosaic;