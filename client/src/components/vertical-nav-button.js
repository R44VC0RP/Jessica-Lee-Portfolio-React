import React from 'react'

import PropTypes from 'prop-types'

import './vertical-nav-button.css'

const VerticalNavButton = (props) => {
  return (
    <div className={`vertical-nav-button-container ${props.rootClassName} ${props.isActive ? 'active' : ''}`}>
      <div
        onClick={props.onClick}
        className="vertical-nav-button-container1"
      >
        <span className="vertical-nav-button-text">{props.buttonText}</span>
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
