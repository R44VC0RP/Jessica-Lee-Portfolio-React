import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userProfileName, setUserProfileName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName'); // Assuming the user's name is stored in localStorage
    const userImage = localStorage.getItem('userImage'); // Assuming the user's image is stored in localStorage
    const userProfileName = localStorage.getItem('userProfileName'); // Assuming the user's name is stored in localStorage
    setIsLoggedIn(!!token);
    setUserName(name);
    setUserImage(userImage);
    setUserProfileName(userProfileName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setUserImage('');
    window.location.href = '/login';
  };

  return (
    <header className={`main-navbar-container ${props.rootClassName}`}>
      <header data-thq="thq-navbar" className="main-navbar-navbar-interactive">
        <Link to="/" className="main-navbar-navlink">
          <img
            alt="Jessica Lee Logo"
            src="/jhlogo.png"
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
            <a
              href="/contact"
              className="main-button"
            >
              Contact Me
            </a>
          </nav>
          {isLoggedIn && (
            <div className="main-navbar-user-info">
              <img src={userImage} className="main-navbar-logo-user" style={{ borderRadius: '50%' }} />
              <span className="main-navbar-user-name">
                <a className='thq-link' href="/admin">{userProfileName}</a>
              </span>
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
    { href: '/portfolio', text: 'Portfolio' },
  ],
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
