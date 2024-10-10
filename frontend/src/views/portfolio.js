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
  const [visibleProjects, setVisibleProjects] = useState(6); // Change initial value to 6
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
      setVisibleProjects(prevVisible => prevVisible + 6); // Change to load 6 more projects
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="portfolio-container">
      <Helmet>
        <title>My Portfolio | Jessica Lee</title>
        <meta
          name="description"
          content="Welcome to my portfolio! Here you'll find a collection of my work in graphic design."
        />
        <meta property="og:title" content="My Portfolio | Jessica Lee" />
        <meta
          property="og:description"
          content="Welcome to my portfolio! Here you'll find a collection of my work in graphic design."
        />
        <meta
          property="og:image"
          
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
      {visibleProjects < allProjects.length && (
        <div className="flex justify-center items-center py-4">
          <button
            onClick={loadMoreProjects}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
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