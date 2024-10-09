import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import VerticalNavButton from './vertical-nav-button'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'
import './portfolio-showcase.css'
import { API_URL } from '../global';

const PortfolioShowcase = () => {
  const [projects, setProjects] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects/newest`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [token]);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="portfolio-showcase-layout251 thq-section-padding ">
      <div className="portfolio-showcase-max-width thq-section-max-width">
        <div className="thq-flex-row portfolio-showcase-section-title">
          <div className="portfolio-showcase-column thq-flex-column">
            <h2 className="thq-heading-2 portfolio-showcase-text">
              My Portfolio
            </h2>
          </div>
          <span className="thq-body-small">
            Here are my most notable or most recent projects!
          </span>
        </div>
        <div className="portfolio-showcase-content">
          <div className="portfolio-showcase-row thq-flex-row">
            {projects.map((project, index) => (
              <div key={index} className={`portfolio-showcase-feature${index + 1} thq-flex-column`}>
                <img
                  alt={project.p_title}
                  src={project.p_images[0]}
                  className={`thq-img-ratio-native-image portfolio-showcase-feature${index + 1}-image`}
                  onClick={() => openLightbox(index)}
                />
                <div className={`portfolio-showcase-content${index + 1} thq-flex-column`}>
                  <h3 className="thq-heading-3">{project.p_title}</h3>
                  <span className="thq-body-small">{project.p_description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={projects[photoIndex].p_images[0]}
          nextSrc={projects[(photoIndex + 1) % projects.length].p_images[0]}
          prevSrc={projects[(photoIndex + projects.length - 1) % projects.length].p_images[0]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + projects.length - 1) % projects.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % projects.length)
          }
        />
      )}
    </div>
  )
}

export default PortfolioShowcase
