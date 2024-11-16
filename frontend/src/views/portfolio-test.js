import React, { useEffect, useState, useCallback } from 'react'

import { Helmet } from 'react-helmet'
import { jellyTriangle } from 'ldrs'

jellyTriangle.register()

import MainNavbar from '../components/main-navbar'
import PortfolioShowcase from '../components/portfolio-showcase'
import PortfolioHighlight from '../components/portfolio-highlight'
import Footer from '../components/footer'
import './portfolio.css'
import ProjectMosaic from '../components/ProjectMosaic'

const PortfolioTest = (props) => {
  const [showcaseProjects, setShowcaseProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
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
          content="https://utfs.io/f/Ikk25IOqr5UOAwJk7USbO8HN2EYRu3wtifpqJTyUMmgsd0zF"
        />
        <meta property='url' content='https://itsmejessicalee.com' />
        
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
      <ProjectMosaic projects={allProjects} />
      {loading && (
        <div className="flex justify-center items-center py-4">
          <l-jelly-triangle
            size="40"
            speed="1.75"
            color="black"
          ></l-jelly-triangle>
        </div>
      )}
      <Footer></Footer>
    </div>
  )
}

export default PortfolioTest