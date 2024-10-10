import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import MainNavbar from '../components/main-navbar';
import Footer from '../components/footer';
import { 
  FacebookShareButton, TwitterShareButton, LinkedinShareButton, 
  FacebookIcon, TwitterIcon, LinkedinIcon
} from 'react-share';
import { generateOGImage } from '../utils/generateOGimage';

const ProjectId = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [ogImageUrl, setOgImageUrl] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/get/${id}`);
        setProject(response.data);
        
        // Generate OG image
        const ogImageResponse = await axios.post('/api/opengraph/generate', {
          title: response.data.p_title,
          description: response.data.p_description,
          imagePath: response.data.p_images[0]
        });
        
        // Update to use the image path returned from the backend
        const ogImageUrl = `${window.location.origin}/api/tmp-images/${ogImageResponse.data.split('/').pop()}`; // Construct the URL
        console.log("OG Image URL: ", ogImageUrl);
        setOgImageUrl(ogImageUrl);
      } catch (error) {
        console.error('Error fetching project or generating OG image:', error);
      }
    };

    fetchProject();

    // Cleanup function to revoke the Blob URL when component unmounts
    return () => {
      if (ogImageUrl) {
        URL.revokeObjectURL(ogImageUrl);
      }
    };
  }, [id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-gray-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading project details...</p>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const title = `Check out this project: ${project.p_title}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{project.p_title} | Project Details</title>
        <meta name="description" content={project.p_description} />
        <meta property="og:title" content={project.p_title} />
        <meta property="og:description" content={project.p_description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={project.p_title} />
        <meta property="twitter:description" content={project.p_description} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:site" content="@itsmejessicalee" />
        <meta property="twitter:creator" content="@itsmejessicalee" />
        <meta property="og:site_name" content="itsmejessicalee.com" />
        <meta property="og:url" content={shareUrl} />
        <meta property="discord:description" content={project.p_description} />
        <meta property="discord:image" content={ogImageUrl} />
      </Helmet>

      <MainNavbar />

      <div className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold mb-4 p-6 bg-gray-100">{project.p_title}</h1>
          <div className="p-6">
            <p className="text-gray-700 mb-6">{project.p_description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {project.p_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.p_title} - Image ${index + 1}`}
                  className="w-full h-64 object-cover cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.p_tags && project.p_tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Project Date: {new Date(project.p_date).toLocaleDateString()}
            </p>
            <div className="flex items-center justify-center space-x-4 border-t pt-4">
              <span className="text-gray-700 font-semibold">Share this project:</span>
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>

        
      </div>

      <Footer />

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

export default ProjectId;
