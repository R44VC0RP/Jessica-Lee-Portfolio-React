import React from 'react'

import PropTypes from 'prop-types'

import './portfolio-all.css'

const PortfolioAll = (props) => {
  return (
    <div className="portfolio-all-gallery3 thq-section-padding">
      <div className="portfolio-all-max-width">
        <div className="portfolio-all-section-title">
          <h2 className="portfolio-all-text thq-heading-2">{props.heading1}</h2>
          <span className="portfolio-all-text1 thq-body-large">
            {props.content1}
          </span>
        </div>
        <div className="portfolio-all-container">
          <div className="portfolio-all-content">
            <div className="portfolio-all-container1">
              <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="portfolio-all-image1 thq-img-ratio-1-1"
              />
              <img
                alt={props.image2Alt}
                src={props.image2Src}
                className="portfolio-all-image2 thq-img-ratio-1-1"
              />
            </div>
            <div className="portfolio-all-container2">
              <img
                alt={props.image3Alt}
                src={props.image3Src}
                className="portfolio-all-image3 thq-img-ratio-4-3"
              />
              <img
                alt={props.image4Alt}
                src={props.image4Src}
                className="portfolio-all-image4 thq-img-ratio-1-1"
              />
              <img
                alt={props.image5Alt}
                src={props.image5Src}
                className="portfolio-all-image5 thq-img-ratio-4-3"
              />
            </div>
            <div className="portfolio-all-container3">
              <img
                alt={props.image6Alt}
                src={props.image6Src}
                className="portfolio-all-image6 thq-img-ratio-1-1"
              />
              <img
                alt={props.image7Alt}
                src={props.image7Src}
                className="portfolio-all-image7 thq-img-ratio-1-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PortfolioAll.defaultProps = {
  image2Alt: 'Jessica Lee showcasing her graphic design portfolio',
  image3Alt:
    'Jessica Lee receiving her Adobe Certified Professional certificate',
  image4Alt: 'Jessica Lee conducting a coffee tasting session',
  image3Src:
    'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAyOXw&ixlib=rb-4.0.3&q=80&w=1080',
  image7Alt: 'Jessica Lee participating in a design workshop',
  image6Alt: 'Jessica Lee at a Starbucks store creating latte art',
  heading1: 'Gallery',
  image7Src:
    'https://images.unsplash.com/photo-1511667282954-8957078364a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAyOXw&ixlib=rb-4.0.3&q=80&w=1080',
  image2Src:
    'https://images.unsplash.com/photo-1563434564528-8fdf5996e622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAzMHw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Src:
    'https://images.unsplash.com/photo-1488841415048-53af7de8f138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAzMHw&ixlib=rb-4.0.3&q=80&w=1080',
  content1:
    'Explore the gallery below to see Jessica Lee in action as a Starbucks Coffee Master and Graphic & Social Designer.',
  image5Alt: 'Jessica Lee designing a social media campaign',
  image5Src:
    'https://images.unsplash.com/photo-1466690672306-5f92132f7248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAzMHw&ixlib=rb-4.0.3&q=80&w=1080',
  image6Src: 'https://play.teleporthq.io/static/svg/default-img.svg',
  image1Alt: 'Jessica Lee presenting at a Starbucks event',
  image4Src:
    'https://images.unsplash.com/photo-1512486754243-f38ddb8e53b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTAyOXw&ixlib=rb-4.0.3&q=80&w=1080',
}

PortfolioAll.propTypes = {
  image2Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image4Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image7Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  heading1: PropTypes.string,
  image7Src: PropTypes.string,
  image2Src: PropTypes.string,
  image1Src: PropTypes.string,
  content1: PropTypes.string,
  image5Alt: PropTypes.string,
  image5Src: PropTypes.string,
  image6Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image4Src: PropTypes.string,
}

export default PortfolioAll
