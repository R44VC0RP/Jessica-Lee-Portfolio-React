import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './project-item.css';

const ProjectItem = ({ project, onEdit }) => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = project.p_images.map(imageId => axios.get(`/api/projects/get_images/${imageId}`));
        const responses = await Promise.all(imagePromises);
        const imageUrls = responses.map(response => response.data);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching project images:', error);
      }
    };

    fetchImages();
  }, [project.p_images]);

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
          <img
            alt={project.p_title}
            src={images[0]}
            className="w-auto h-24 object-cover border border-gray-300 rounded cursor-pointer"
            style={{ maxWidth: '450px', maxHeight: '450px' }}
            onClick={() => setIsOpen(true)}
          />
          <span className="text-gray-500 mt-2">{project.p_images.length} photos</span>
          <span className="text-gray-500 mt-2">{new Date(project.p_date).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col items-start p-4" id="titleanddescription">
          <span className="text-lg font-bold">{project.p_title}</span>
          <span className="text-gray-700">{project.p_description}</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2" id="buttons">
        <button className="main-button" onClick={onEdit}>Edit</button>
        <button className="main-button-bad" onClick={handleDelete}>Delete</button>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
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
