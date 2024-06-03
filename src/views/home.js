import React from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import SchoolWorkExperiance from '../components/school-work-experiance'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Jessica Lee | Graphic Designer</title>
        <meta property="og:title" content="Jessica Lee | Graphic Designer" />
      </Helmet>
      <MainNavbar
        link1="About Me"
        link2="Portfolio"
        link3="Resume"
        link4="Contact"
        action1="View Portfolio"
        logoAlt="Jessica Lee Logo"
        rootClassName="main-navbar-root-class-name"
      ></MainNavbar>
      <div className="home-hero-section">
        <span className="home-header-top-a">HELLO I&apos;M</span>
        <span className="home-header-name-b">Jessica Lee</span>
        <span className="home-header-description-c">
          <span>GRAPHIC &amp;</span>
          <br></br>
          <span>SOCIAL DESIGNER</span>
          <br></br>
        </span>
        <div className="home-background-rectange">
          <img
            alt="image"
            src="/jess_foreground1-1500h.png"
            className="home-image"
          />
        </div>
      </div>
      <div className="home-education">
        <span className="home-text4">
          <span>Education</span>
          <br></br>
        </span>
      </div>
      <SchoolWorkExperiance></SchoolWorkExperiance>
    </div>
  )
}

export default Home
