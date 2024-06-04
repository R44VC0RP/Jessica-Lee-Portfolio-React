import React from 'react'

import PropTypes from 'prop-types'

import './button-selection.css'

const ButtonSelection = (props) => {
  return (
    <div className={`button-selection-container ${props.rootClassName} `}>
      <div
        link-click={props.buttonLink}
        buttonColor={props.buttonColor}
        className="button-selection-container1"
      >
        <span className="button-selection-text">{props.buttonText}</span>
      </div>
    </div>
  )
}

ButtonSelection.defaultProps = {
  buttonLink: 'https://nothing.com',
  rootClassName: '',
  buttonColor: '#2ea44f',
  buttonText: 'Click Me',
}

ButtonSelection.propTypes = {
  buttonLink: PropTypes.string,
  rootClassName: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
}

export default ButtonSelection
