import React from 'react'

import PropTypes from 'prop-types'

import './features20.css'

const Features20 = (props) => {
  return (
    <div className="features20-layout349 thq-section-padding">
      <div className="features20-max-width thq-section-max-width">
        <div className="features20-content">
          <div className="features20-section-title">
            <span className="thq-body-small">{props.feature1Slogan}</span>
            <div className="features20-content1">
              <h2 className="thq-heading-2">{props.feature1Title}</h2>
              <p className="thq-body-large">{props.feature1Description}</p>
            </div>
            <div className="features20-actions">
              <button className="features20-button thq-button-filled">
                <span className="thq-body-small">{props.feature1Action1}</span>
              </button>
              <button className="features20-button1 thq-button-outline">
                <span className="thq-body-small">{props.feature1Action2}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="features20-image-container">
          <img
            alt={props.feature1ImageAlt}
            src={props.feature1ImageSrc}
            className="features20-placeholder-image thq-img-ratio-16-9"
          />
        </div>
      </div>
    </div>
  )
}

Features20.defaultProps = {
  feature1Action1: 'View Portfolio',
  feature1Description:
    'Jessica Lee specializes in creating custom design solutions tailored to your needs, ensuring a unique and impactful result.',
  feature1Slogan: 'Bringing Your Ideas to Life',
  feature1ImageAlt: 'Graphic design work by Jessica Lee',
  feature1Title: 'Unique Design Solutions',
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1462841764092-352b1d22ced3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzIwMzczNnw&ixlib=rb-4.0.3&q=80&w=1080',
  feature1Action2: 'Contact Jessica',
}

Features20.propTypes = {
  feature1Action1: PropTypes.string,
  feature1Description: PropTypes.string,
  feature1Slogan: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Title: PropTypes.string,
  feature1ImageSrc: PropTypes.string,
  feature1Action2: PropTypes.string,
}

export default Features20
