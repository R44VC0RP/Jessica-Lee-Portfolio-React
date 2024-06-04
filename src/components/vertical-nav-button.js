import React from 'react'

import PropTypes from 'prop-types'

import './vertical-nav-button.css'

const VerticalNavButton = (props) => {
  return (
    <div className={`vertical-nav-button-container ${props.rootClassName} `}>
      <div
        link-click={props.buttonLink}
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
}

VerticalNavButton.propTypes = {
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default VerticalNavButton
