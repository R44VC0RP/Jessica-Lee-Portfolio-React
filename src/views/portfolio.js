import React from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import PortfolioShowcase from '../components/portfolio-showcase'
import PortfolioAll from '../components/portfolio-all'
import PrimaryContact from '../components/primary-contact'
import Footer from '../components/footer'
import './portfolio.css'

const Portfolio = (props) => {
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
        link4="Contact"
        linkB="Portfolio"
        linkC="Resume"
        linkA="About Me"
        action1="View Portfolio"
        logoAlt="Jessica Lee Logo"
        rootClassName="main-navbar-root-class-name2"
      ></MainNavbar>
      <PortfolioShowcase></PortfolioShowcase>
      <PortfolioAll></PortfolioAll>
      <div id="contact_form" className="portfolio-contact">
        <PrimaryContact contactID="primaryContactSection"></PrimaryContact>
      </div>
      <Footer rootClassName="footer-root-class-name1"></Footer>
    </div>
  )
}

export default Portfolio
