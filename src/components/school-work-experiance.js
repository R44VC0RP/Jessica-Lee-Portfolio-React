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
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

SchoolWorkExperiance.defaultProps = {
  bodyText:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  bodyTitle: 'Starbucks Coffee Master',
  businessLogo:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png',
  rootClassName: '',
  timeSpan: '2022-2024',
  bulletPoints: '•',
}

SchoolWorkExperiance.propTypes = {
  bodyText: PropTypes.string,
  bodyTitle: PropTypes.string,
  businessLogo: PropTypes.string,
  rootClassName: PropTypes.string,
  timeSpan: PropTypes.string,
  bulletPoints: PropTypes.string,
}

export default SchoolWorkExperiance
