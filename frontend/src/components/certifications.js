import React from 'react'

import PropTypes from 'prop-types'

import './certifications.css'

const Certifications = (props) => {
  return (
    <div
      className={`certifications-testimonial4 thq-section-padding ${props.rootClassName} `}
    >
      <div className="certifications-max-width thq-section-max-width">
        <div className="certifications-container">
          <div className="certifications-avatar">
            <div className="certifications-avatar-content">
              <img
                alt="John Smith - CEO of ABC Inc."
                src={props.businessLogo}
                loading="lazy"
                className="certifications-avatar-image thq-img-round thq-img-ratio-1-1"
              />
              <span className="certifications-text thq-body-small">
                {props.timeSpan}
              </span>
            </div>
          </div>
          <div className="certifications-container1">
            <p className="certifications-title thq-body-large">
              {props.bodyTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

Certifications.defaultProps = {
  bodyTitle: 'ACP - Adobe Certified Professional - Illustrator',
  rootClassName: '',
  businessLogo:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png',
  timeSpan: '2022-2024',
}

Certifications.propTypes = {
  bodyTitle: PropTypes.string,
  rootClassName: PropTypes.string,
  businessLogo: PropTypes.string,
  timeSpan: PropTypes.string,
}

export default Certifications
