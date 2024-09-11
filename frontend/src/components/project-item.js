import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import './project-item.css';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const token = localStorage.getItem('token');



  const handleDelete = async () => {
    try {
      await axios.delete(`/api/projects/delete/${project.p_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Optionally, you can add code here to update the UI after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="flex flex-row items-center w-full justify-between project-card">
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-col items-center p-4" id="photos">
          <Link to={`/projects/${project.p_id}`}>
            <img
              alt={project.p_title}
              src={project.p_images[0]}
              className="w-auto h-24 object-cover border border-gray-300 rounded cursor-pointer"
              style={{ maxWidth: '450px', maxHeight: '450px' }}
            />
          </Link>
          <span className="text-gray-500 mt-2">{project.p_images.length} photos</span>
          <span className="text-gray-500 mt-2">{new Date(project.p_date).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col items-start p-4" id="titleanddescription">
          <Link to={`/projects/${project.p_id}`} className="text-lg font-bold hover:underline">
            {project.p_title}
          </Link>
          <span className="text-gray-700">{project.p_description}</span>
          {project.p_tags && project.p_tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2" id="buttons">
        <button className="main-button" onClick={onEdit}>Edit</button>
        <button className="main-button-bad" onClick={handleDelete}>Delete</button>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={project.p_images[photoIndex]}
          nextSrc={project.p_images[(photoIndex + 1) % project.p_images.length]}
          prevSrc={project.p_images[(photoIndex + project.p_images.length - 1) % project.p_images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + project.p_images.length - 1) % project.p_images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % project.p_images.length)
          }
        />
      )}
      
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.shape({
    p_id: PropTypes.string.isRequired,
    p_title: PropTypes.string.isRequired,
    p_description: PropTypes.string.isRequired,
    p_images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProjectItem;
