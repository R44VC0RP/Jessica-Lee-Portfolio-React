import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  return (
    <header className={`main-navbar-container ${props.rootClassName}`}>
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
            {props.links.map((link) => (
              <a
                href={link.href}
                className="main-navbar-link thq-body-small thq-link"
              >
                {link.text}
              </a>
            ))}
            
          </nav>
        </div>
      </header>
    </header>
  )
}

MainNavbar.defaultProps = {
  links: [
    { href: '#home-education', text: 'Education' },
    { href: '#home-experience', text: 'Experience' }
  ],
  logoSrc: '/jh%20logo-1500h.png',
  rootClassName: '',
  logoAlt: 'Jessica Lee Logo',
}

MainNavbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string
  })),
  logoSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
  
}

export default MainNavbar
