import React from 'react'

import PropTypes from 'prop-types'

import VerticalNavButton from './vertical-nav-button'
import './portfolio-showcase.css'

const PortfolioShowcase = (props) => {
  return (
    <div className="portfolio-showcase-layout251 thq-section-padding">
      <div className="portfolio-showcase-max-width thq-section-max-width">
        <div className="thq-flex-row portfolio-showcase-section-title">
          <div className="portfolio-showcase-column thq-flex-column">
            <h2 className="thq-heading-2 portfolio-showcase-text">
              My Portfolio
            </h2>
          </div>
          <span className="thq-body-small">
            Here are my most notable or most recent projects!
          </span>
        </div>
        <div className="portfolio-showcase-content">
          <div className="portfolio-showcase-row thq-flex-row">
            <div className="portfolio-showcase-feature1 thq-flex-column">
              <img
                alt={props.imshow1Alt}
                src={props.imshow1Img}
                className="thq-img-ratio-4-3 portfolio-showcase-feature1-image"
              />
              <div className="portfolio-showcase-content1 thq-flex-column">
                <h3 className="thq-heading-3">{props.imshow1Title}</h3>
                <span className="thq-body-small">{props.imshow1}</span>
              </div>
            </div>
            <div className="portfolio-showcase-feature2 thq-flex-column">
              <img
                alt={props.imshow2Alt}
                src={props.imshow2Img}
                className="thq-img-ratio-4-3 portfolio-showcase-feature2-image"
              />
              <div className="portfolio-showcase-content2 thq-flex-column">
                <h3 className="thq-heading-3">{props.imshow2Title}</h3>
                <span className="thq-body-small">{props.imshow2}</span>
              </div>
            </div>
            <div className="portfolio-showcase-feature3 thq-flex-column">
              <img
                alt={props.feature3ImageAlt}
                src={props.feature3ImageSrc}
                className="thq-img-ratio-4-3 portfolio-showcase-feature3-image"
              />
              <div className="portfolio-showcase-content3 thq-flex-column">
                <h3 className="thq-heading-3">{props.feature3Title}</h3>
                <span className="thq-body-small">
                  {props.feature3Description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio-showcase-actions">
          <VerticalNavButton
            buttonText="Contact Me"
            rootClassName="vertical-nav-button-root-class-name4"
          ></VerticalNavButton>
        </div>
      </div>
    </div>
  )
}

PortfolioShowcase.defaultProps = {
  imshow1Alt: 'Starbucks Coffee Master Certification',
  sectionDescription:
    "Discover the key features of Jessica Lee's profile and expertise.",
  feature3ImageAlt: 'Adobe Certified Professional in Illustrator Badge',
  feature3ImageSrc:
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1ODk0NHw&ixlib=rb-4.0.3&q=80&w=1080',
  feature3Title: 'Adobe Certified Professional in Illustrator',
  imshow2Title: 'Graphic & Social Designer',
  imshow2Alt: 'Graphic & Social Designer Portfolio',
  imshow2Img:
    'https://images.unsplash.com/photo-1554774853-7f03caeb4b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1ODk0M3w&ixlib=rb-4.0.3&q=80&w=1080',
  imshow2:
    'With a passion for design, Jessica Lee excels in creating visually appealing graphics for various platforms, including social media.',
  slogan: 'Unlocking Creativity and Coffee Mastery',
  feature3Description:
    'Jessica Lee holds a prestigious certification as an Adobe Certified Professional in Illustrator, showcasing her expertise in vector graphics and design.',
  imshow1Title: 'Starbucks Coffee Master',
  sectionTitle: 'Features',
  secondaryAction: 'View Certifications',
  imshow1:
    'Jessica Lee is a certified Starbucks Coffee Master with extensive knowledge of coffee origins, brewing techniques, and flavor profiles.',
  mainAction: 'Learn More',
  imshow1Img:
    'https://images.unsplash.com/photo-1512585285324-1649f5fd2c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1ODk0NHw&ixlib=rb-4.0.3&q=80&w=1080',
}

PortfolioShowcase.propTypes = {
  imshow1Alt: PropTypes.string,
  sectionDescription: PropTypes.string,
  feature3ImageAlt: PropTypes.string,
  feature3ImageSrc: PropTypes.string,
  feature3Title: PropTypes.string,
  imshow2Title: PropTypes.string,
  imshow2Alt: PropTypes.string,
  imshow2Img: PropTypes.string,
  imshow2: PropTypes.string,
  slogan: PropTypes.string,
  feature3Description: PropTypes.string,
  imshow1Title: PropTypes.string,
  sectionTitle: PropTypes.string,
  secondaryAction: PropTypes.string,
  imshow1: PropTypes.string,
  mainAction: PropTypes.string,
  imshow1Img: PropTypes.string,
}

export default PortfolioShowcase
