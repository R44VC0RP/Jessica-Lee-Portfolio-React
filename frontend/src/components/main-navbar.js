import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName'); // Assuming the user's name is stored in localStorage
    setIsLoggedIn(!!token);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
  };

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
            {props.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="main-navbar-link thq-body-small thq-link"
              >
                {link.text}
              </a>
            ))}
          </nav>
          {isLoggedIn && (
            <div className="main-navbar-user-info">
              <span className="main-navbar-user-name">{userName}</span>
              <button onClick={handleLogout} className="main-navbar-logout-button">Logout</button>
            </div>
          )}
        </div>
      </header>
    </header>
  )
}

MainNavbar.defaultProps = {
  links: [
    { href: '/#home-education', text: 'Education' },
    { href: '/#home-experience', text: 'Experience' },
    { href: '/#certifications', text: 'Certifications' },
    { href: '/portfolio', text: 'Portfolio' },
  ],
  logoSrc: '/jh%20logo-1500h.png',
  rootClassName: '',
  logoAlt: 'Jessica Lee Logo',
}

MainNavbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string
  })),
  logoSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  logoAlt: PropTypes.string,
}

export default MainNavbar
