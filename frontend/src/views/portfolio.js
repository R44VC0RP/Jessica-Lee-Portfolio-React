import React, { useEffect, useState, useCallback } from 'react'

import { Helmet } from 'react-helmet'
import { jellyTriangle } from 'ldrs'

jellyTriangle.register()


import MainNavbar from '../components/main-navbar'
import PortfolioShowcase from '../components/portfolio-showcase'
import PortfolioHighlight from '../components/portfolio-highlight'
import Footer from '../components/footer'
import './portfolio.css'

const Portfolio = (props) => {
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [loading, setLoading] = useState(false);

  const fetchShowcaseProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects/newest');
      const data = await response.json();
      setShowcaseProjects(data);
    } catch (error) {
      console.error('Error fetching showcase projects:', error);
    }
  }, []);

  const fetchAllProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects/getall');
      const data = await response.json();
      setAllProjects(data.reverse());
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  }, []);

  useEffect(() => {
    fetchShowcaseProjects();
    fetchAllProjects();
  }, [fetchShowcaseProjects, fetchAllProjects]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      loadMoreProjects();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const loadMoreProjects = () => {
    if (visibleProjects >= allProjects.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleProjects(prevVisible => prevVisible + 3);
      setLoading(false);
    }, 1000);
  };

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
      <PortfolioShowcase projects={showcaseProjects}></PortfolioShowcase>
      <div className="portfolio-all-max-width">
        <div className="portfolio-all-section-title">
          <h2 className="portfolio-all-text thq-heading-2">Project Portfolio</h2>
          <span className="portfolio-all-text1 thq-body-large">
            Explore a curated collection of my professional projects, showcasing my expertise in design and innovation.
          </span>
        </div>
      </div>
      <div className="w-[90%] mx-auto">
        {allProjects.slice(0, visibleProjects).map((project, index) => (
          <PortfolioHighlight
            key={project.p_id}
            title={project.p_title}
            description={project.p_description}
            images={project.p_images}
          />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <l-jelly-triangle
            size="40"
            speed="1.75"
            color="black"
          ></l-jelly-triangle>
        </div>
      )}
      {/* <div id="contact_form" className="portfolio-contact">
        <PrimaryContact contactID="primaryContactSection" ></PrimaryContact>
      </div> */}
      {/* <ContactMe></ContactMe> */}
      <Footer></Footer>
    </div>
  )
}

export default Portfolio