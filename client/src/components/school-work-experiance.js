import React from 'react'

import PropTypes from 'prop-types'

import './school-work-experiance.css'

const SchoolWorkExperiance = (props) => {
  return (
    <div
      className={`school-work-experiance-testimonial4 thq-section-padding ${props.rootClassName} `}
    >
      <div className="school-work-experiance-max-width thq-section-max-width">
        <div className="school-work-experiance-container">
          <div className="school-work-experiance-avatar">
            <div className="school-work-experiance-avatar-content">
              <img
                alt="John Smith - CEO of ABC Inc."
                src={props.businessLogo}
                loading="lazy"
                className="school-work-experiance-avatar-image thq-img-round thq-img-ratio-1-1"
              />
              <span className="school-work-experiance-text thq-body-small">
                {props.timeSpan}
              </span>
            </div>
          </div>
          <div className="school-work-experiance-container1">
            <p className="school-work-experiance-title thq-body-large">
              {props.bodyTitle}
            </p>
            <span className="school-work-experiance-text1 thq-body-large">
              {props.bodyText}
              <ul>
                {Array.isArray(props.bulletPoints) && props.bulletPoints.map((point) => (
                  <li className="item-bullet" key={point}>{point}</li>
                ))}
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

SchoolWorkExperiance.defaultProps = {
  bodyText:
    "This is a sample body text for a school work experiance.",
  bodyTitle: 'Job Title',
  businessLogo:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png',
  rootClassName: '',
  timeSpan: 'Timeframe',
  bulletPoints: ['Example 1', 'Example 2', 'Example 3']
}

SchoolWorkExperiance.propTypes = {
  bodyText: PropTypes.string,
  bodyTitle: PropTypes.string,
  businessLogo: PropTypes.string,
  rootClassName: PropTypes.string,
  timeSpan: PropTypes.string,
  bulletPoints: PropTypes.array,
}

export default SchoolWorkExperiance
