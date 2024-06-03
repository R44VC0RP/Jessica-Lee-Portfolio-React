import React from 'react'

import PropTypes from 'prop-types'

import './features19.css'

const Features19 = (props) => {
  return (
    <div className="features19-layout349 thq-section-padding">
      <div className="features19-max-width thq-section-max-width">
        <div className="features19-image-container">
          <img
            alt={props.feature1ImageAlt}
            src={props.feature1ImageSrc}
            className="thq-img-ratio-16-9"
          />
        </div>
        <div className="features19-content">
          <div className="features19-section-title">
            <span className="thq-body-small">{props.feature1Slogan}</span>
            <div className="features19-content1">
              <h2 className="thq-heading-2">{props.feature1Title}</h2>
              <p className="thq-body-large">{props.feature1Description}</p>
            </div>
            <div className="features19-actions">
              <button className="features19-button thq-button-filled">
                <span className="thq-body-small">{props.feature1Action1}</span>
              </button>
              <button className="features19-button1 thq-button-outline">
                <span className="thq-body-small">{props.feature1Action2}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Features19.defaultProps = {
  feature1Action2: 'Learn More',
  feature1Title: 'Graphic Design Projects',
  feature1Description: 'Explore a collection of unique graphic design projects',
  feature1ImageAlt: 'Graphic Design Projects Image',
  feature1Slogan: 'Where creativity meets functionality',
  feature1Action1: 'View Portfolio',
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1585963087799-be7184ca7dd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzIwMzcyNXw&ixlib=rb-4.0.3&q=80&w=1080',
}

Features19.propTypes = {
  feature1Action2: PropTypes.string,
  feature1Title: PropTypes.string,
  feature1Description: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Slogan: PropTypes.string,
  feature1Action1: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
}

export default Features19
