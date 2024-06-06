import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { jellyTriangle } from 'ldrs'

jellyTriangle.register()


import MainNavbar from '../components/main-navbar'
import PortfolioShowcase from '../components/portfolio-showcase'
import PortfolioAll from '../components/portfolio-all'
import PrimaryContact from '../components/primary-contact'
import Footer from '../components/footer'
import './portfolio.css'

const Portfolio = (props) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/featured-projects', {
      method: 'GET'
    }) // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <l-jelly-triangle
          size="30"
          speed="1.75" 
          color="black" 
        ></l-jelly-triangle>
      </div>
    );
  }

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
      <MainNavbar
        links={[
          { href: '#home-education', text: 'Education', key: 'education' },
          { href: '#home-experience', text: 'Experience', key: 'experience' },
          { href: '#certifications', text: 'Certifications', key: 'certifications' },
        ]}
        linkAhref="#aboutmestart"
        linkBhref="/portfolio"
        linkChref="#contactme"
        logoAlt="Jessica Lee Logo"
      ></MainNavbar>
      <PortfolioShowcase></PortfolioShowcase>
      <PortfolioAll ></PortfolioAll>
      <div id="contact_form" className="portfolio-contact">
        <PrimaryContact contactID="primaryContactSection" ></PrimaryContact>
      </div>
      <Footer 
      links={[
        { href: '#home-education', text: 'Education', key: 'education' },
        { href: '#home-experience', text: 'Experience', key: 'experience' },
        { href: '#certifications', text: 'Certifications', key: 'certifications' },
      ]}
      rootClassName="footer-root-class-name1"></Footer>
    </div>
  )
}

export default Portfolio
