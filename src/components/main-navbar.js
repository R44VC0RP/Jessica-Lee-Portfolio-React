import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  const [link5AccordionOpen, setLink5AccordionOpen] = useState(false)
  const [link5DropdownVisible, setLink5DropdownVisible] = useState(false)
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
              className="main-navbar-link2 thq-body-small thq-link"
            >
              {props.linkA}
            </a>
            <Link
              to="/portfolio"
              className="main-navbar-link3 thq-body-small thq-link"
            >
              {props.linkB}
            </Link>
            <Link
              to="/portfolio"
              className="main-navbar-link4 thq-body-small thq-link"
            >
              {props.linkC}
            </Link>
          </nav>
        </div>
        <div data-thq="thq-burger-menu" className="main-navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="main-navbar-icon">
            <path
              d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
              className=""
            ></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="main-navbar-mobile-menu">
          <div className="main-navbar-nav">
            <div className="main-navbar-top">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="main-navbar-logo"
              />
              <div data-thq="thq-close-menu" className="main-navbar-close-menu">
                <svg viewBox="0 0 1024 1024" className="main-navbar-icon2">
                  <path
                    d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
            <nav className="main-navbar-links1">
              <span className="thq-body-small thq-link">{props.linkA}</span>
              <span className="thq-body-small thq-link">{props.linkB}</span>
              <span className="thq-body-small thq-link">{props.linkC}</span>
            </nav>
          </div>
        </div>
      </header>
      {link5DropdownVisible && (
        <div
          onClick={() => setLink5DropdownVisible(false)}
          className="main-navbar-container1"
        ></div>
      )}
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
