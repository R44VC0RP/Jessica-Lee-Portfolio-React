import React, { useState } from 'react'

import PropTypes from 'prop-types'

import './main-navbar.css'

const MainNavbar = (props) => {
  const [link5AccordionOpen, setLink5AccordionOpen] = useState(false)
  const [link5DropdownVisible, setLink5DropdownVisible] = useState(false)
  return (
    <header className={`main-navbar-container ${props.rootClassName} `}>
      <header data-thq="thq-navbar" className="main-navbar-navbar-interactive">
        <img
          alt={props.logoAlt}
          src={props.logoSrc}
          className="main-navbar-image1"
        />
        <div data-thq="thq-navbar-nav" className="main-navbar-desktop-menu">
          <nav className="main-navbar-links">
            <span className="thq-body-small thq-link">{props.link1}</span>
            <span className="thq-body-small thq-link">{props.link2}</span>
            <span className="thq-body-small thq-link">{props.link3}</span>
            <div
              onClick={() => setLink5DropdownVisible(!link5DropdownVisible)}
              className="main-navbar-link5-dropdown-trigger"
            >
              <span className="thq-body-small thq-link">{props.link4}</span>
              <div className="main-navbar-icon-container">
                {link5DropdownVisible && (
                  <div className="main-navbar-container1">
                    <svg viewBox="0 0 1024 1024" className="main-navbar-icon">
                      <path d="M298 426h428l-214 214z" className=""></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
        <div data-thq="thq-burger-menu" className="main-navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="main-navbar-icon2">
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
                <svg viewBox="0 0 1024 1024" className="main-navbar-icon4">
                  <path
                    d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
            <nav className="main-navbar-links1">
              <span className="thq-body-small thq-link">{props.link1}</span>
              <span className="thq-body-small thq-link">{props.link2}</span>
              <span className="thq-body-small thq-link">{props.link3}</span>
              <div className="main-navbar-link5-accordion">
                <div
                  onClick={() => setLink5AccordionOpen(!link5AccordionOpen)}
                  className="main-navbar-trigger"
                >
                  <span className="thq-body-small thq-link">{props.link4}</span>
                </div>
                {link5AccordionOpen && (
                  <div className="main-navbar-container2">
                    <div className="main-navbar-menu-item">
                      <img
                        alt={props.page1ImageAlt}
                        src={props.page1ImageSrc}
                        className="main-navbar-page1-image"
                      />
                      <div className="main-navbar-content">
                        <span className="main-navbar-page1 thq-body-large">
                          {props.page1}
                        </span>
                        <span className="thq-body-small">
                          {props.page1Description}
                        </span>
                      </div>
                    </div>
                    <div className="main-navbar-menu-item1">
                      <img
                        alt={props.page2ImageAlt}
                        src={props.page2ImageSrc}
                        className="main-navbar-page2-image"
                      />
                      <div className="main-navbar-content1">
                        <span className="main-navbar-page2 thq-body-large">
                          {props.page2}
                        </span>
                        <span className="thq-body-small">
                          {props.page2Description}
                        </span>
                      </div>
                    </div>
                    <div className="main-navbar-menu-item2">
                      <img
                        alt={props.page3ImageAlt}
                        src={props.page3ImageSrc}
                        className="main-navbar-page3-image"
                      />
                      <div className="main-navbar-content2">
                        <span className="main-navbar-page3 thq-body-large">
                          {props.page3}
                        </span>
                        <span className="thq-body-small">
                          {props.page3Description}
                        </span>
                      </div>
                    </div>
                    <div className="main-navbar-menu-item3">
                      <img
                        alt={props.page4ImageAlt}
                        src={props.page4ImageSrc}
                        className="main-navbar-page4-image"
                      />
                      <div className="main-navbar-content3">
                        <span className="main-navbar-page4 thq-body-large">
                          {props.page4}
                        </span>
                        <span className="thq-body-small">
                          {props.buttonText}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
      {link5DropdownVisible && (
        <div
          onClick={() => setLink5DropdownVisible(false)}
          className="main-navbar-container3"
        ></div>
      )}
    </header>
  )
}

MainNavbar.defaultProps = {
  buttonText: 'Page Four Description',
  page4ImageAlt: 'image',
  page2: 'Page Two',
  page2ImageSrc:
    'https://images.unsplash.com/photo-1618034100983-e1d78be0dc80?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE3fHxyb3VuZHxlbnwwfHx8fDE3MTYzOTkzNDR8MA&ixlib=rb-4.0.3&w=1400',
  page3ImageSrc:
    'https://images.unsplash.com/photo-1524448789231-1bb0771e7d45?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDd8fHJvdW5kfGVufDB8fHx8MTcxNjM5OTM0NHww&ixlib=rb-4.0.3&w=1400',
  page1: 'Page One',
  page3ImageAlt: 'image',
  text: 'View Portfolio',
  action1: 'Main Action',
  page4ImageSrc:
    'https://images.unsplash.com/photo-1605745141160-8892dc674e94?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDI0fHxyb3VuZHxlbnwwfHx8fDE3MTYzOTkzNDR8MA&ixlib=rb-4.0.3&w=1400',
  page1ImageAlt: 'image',
  page2ImageAlt: 'image',
  link4: 'Link 4',
  link3: 'Link 3',
  logoSrc: '/jh%20logo-1500h.png',
  link2: 'Link 2',
  page2Description: 'Page Two Description',
  page3Description: 'Page Three Description',
  page3: 'Page Three',
  page1ImageSrc:
    'https://images.unsplash.com/photo-1514285490982-4130e9aefedb?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fHJvdW5kfGVufDB8fHx8MTcxNjM5OTM0NHww&ixlib=rb-4.0.3&w=1400',
  rootClassName: '',
  page1Description: 'Page One Description',
  page4: 'Page Four',
  logoAlt: 'logo',
  link1: 'Link 1',
}

MainNavbar.propTypes = {
  buttonText: PropTypes.string,
  page4ImageAlt: PropTypes.string,
  page2: PropTypes.string,
  page2ImageSrc: PropTypes.string,
  page3ImageSrc: PropTypes.string,
  page1: PropTypes.string,
  page3ImageAlt: PropTypes.string,
  text: PropTypes.string,
  action1: PropTypes.string,
  page4ImageSrc: PropTypes.string,
  page1ImageAlt: PropTypes.string,
  page2ImageAlt: PropTypes.string,
  link4: PropTypes.string,
  link3: PropTypes.string,
  logoSrc: PropTypes.string,
  link2: PropTypes.string,
  page2Description: PropTypes.string,
  page3Description: PropTypes.string,
  page3: PropTypes.string,
  page1ImageSrc: PropTypes.string,
  rootClassName: PropTypes.string,
  page1Description: PropTypes.string,
  page4: PropTypes.string,
  logoAlt: PropTypes.string,
  link1: PropTypes.string,
}

export default MainNavbar
