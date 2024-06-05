import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  return (
    <header className={`main-navbar-container ${props.rootClassName} `}>
      <header data-thq="thq-navbar" className="main-navbar-navbar-interactive">
        <Link to="/" className="main-navbar-navlink">
          <img
            alt={props.logoAlt}
            src={props.logoSrc}
            className="main-navbar-image1"
          />
        </Link>
        <div data-thq="thq-navbar-nav" className="main-navbar-desktop-menu">
          <nav className="main-navbar-links">
            <a
              href="#aboutmestart"
              className="main-navbar-link thq-body-small thq-link"
            >
              {props.linkA}
            </a>
            <Link
            
              to="/portfolio"
              className="main-navbar-link thq-body-small thq-link"
            >
              {props.linkB}
            </Link>
            <Link
              to="/portfolio"
              className="main-navbar-link thq-body-small thq-link"
            >
              {props.linkC}
            </Link>
          </nav>
        </div>
        
      </header>
    </header>
  )
}

MainNavbar.defaultProps = {
  linkC: 'Contact Me',
  logoSrc: '/jh%20logo-1500h.png',
  linkB: 'My Portfolio',
  rootClassName: '',
  logoAlt: 'Jessica Lee Logo',
  linkA: 'About Me',
}

MainNavbar.propTypes = {
  linkC: PropTypes.string,
  logoSrc: PropTypes.string,
  linkB: PropTypes.string,
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  linkA: PropTypes.string,
}

export default MainNavbar
