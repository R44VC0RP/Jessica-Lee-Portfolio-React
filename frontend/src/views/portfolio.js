import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { jellyTriangle } from 'ldrs'

jellyTriangle.register()


import MainNavbar from '../components/main-navbar'
import PortfolioShowcase from '../components/portfolio-showcase'
import PortfolioAll from '../components/portfolio-all'
import PrimaryContact from '../components/primary-contact'
import Footer from '../components/footer'
import PortfolioHighlight from '../components/portfolio-highlight'
import ContactMe from '../components/contactme'
import './portfolio.css'

const Portfolio = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/getall');
        const data = await response.json();
        console.log(data);
        
        const fetchImageSrc = async (imageId) => {
          try {
            const response = await fetch(`/api/projects/get_images/${imageId}`);
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching image source:', error);
            return '';
          }
        };

        const projectsWithImages = await Promise.all(data.map(async (project) => {
          const imageSrcs = await Promise.all(project.p_images.map(fetchImageSrc));
          return { ...project, p_images: imageSrcs };
        }));

        console.log(projectsWithImages)

        setProjects(projectsWithImages);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="portfolio-container">
      <Helmet>
        <title>My Portfolio | Jessica Lee</title>
        <meta
          name="description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta property="og:title" content="My Portfolio | Jessica Lee" />
        <meta
          property="og:description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta
          property="og:image"
          content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/ace773d9-65a9-44ba-ac39-707201869c92/78be31de-57a6-476c-9018-cdd8ef481839?org_if_sml=1&amp;force_format=original"
        />
      </Helmet>
      <MainNavbar></MainNavbar>
      <PortfolioShowcase></PortfolioShowcase>
      <PortfolioAll></PortfolioAll>
      {projects.map((project, index) => (
        <PortfolioHighlight
          key={index}
          title={project.p_title}
          description={project.p_description}
          images={project.p_images}
        />
      ))}
      {/* <div id="contact_form" className="portfolio-contact">
        <PrimaryContact contactID="primaryContactSection" ></PrimaryContact>
      </div> */}
      {/* <ContactMe></ContactMe> */}
      <Footer></Footer>
    </div>
  )
}

export default Portfolio

