import React from 'react'

import PropTypes from 'prop-types'

import './vertical-nav-button.css'

const VerticalNavButton = (props) => {
  return (
    <div className={`vertical-nav-button-container ${props.rootClassName} ${props.isActive ? 'active' : ''} w-full md:w-auto`}>
      <div
        onClick={props.onClick}
        className="vertical-nav-button-container1 py-2 px-4 md:py-3 md:px-6 text-center md:text-left"
      >
        <span className="vertical-nav-button-text text-sm md:text-base">{props.buttonText}</span>
      </div>
    </div>
  )
}

VerticalNavButton.defaultProps = {
  buttonLink: 'https://nothing.com',
  buttonText: 'Click Me',
  rootClassName: '',
  onClick: () => {},
  isActive: false,
}

VerticalNavButton.propTypes = {
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  rootClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

export default VerticalNavButton
