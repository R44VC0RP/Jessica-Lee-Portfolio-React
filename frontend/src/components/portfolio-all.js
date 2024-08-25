import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import './portfolio-all.css'

const PortfolioAll = (props) => {
  const [images, setImages] = useState([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/get_images`)
        const data = await response.json()
        console.log(data)
        const shuffledImages = data.sort(() => 0.5 - Math.random()).slice(0, 7)
        console.log(shuffledImages)
        setImages(shuffledImages)
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [])

  const openLightbox = (index) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const moveNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length)
  }

  const movePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length)
  }

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
                {images.length > 0 && 
                  images.filter((_, index) => index % 3 === 0).map((image, filteredIndex) => (
                    <img
                      key={filteredIndex}
                      alt={image.i_id}
                      src={image.i_src}
                      className={`portfolio-all-image1 img-ratio-${filteredIndex % 3 === 0 ? '4-3' : filteredIndex % 3 === 1 ? '1-1' : '16-9'}`}
                      onClick={() => openLightbox(filteredIndex * 3)}
                    />
                  ))
                }
              </div>
              <div className="portfolio-all-container2">
                {images.length > 0 && 
                  images.filter((_, index) => index % 3 === 1).map((image, filteredIndex) => (
                    <img
                      key={filteredIndex}
                      alt={image.i_id}
                      src={image.i_src}
                      className={`portfolio-all-image1 img-ratio-${filteredIndex % 3 === 0 ? '4-3' : filteredIndex % 3 === 1 ? '1-1' : '16-9'}`}
                      onClick={() => openLightbox(filteredIndex * 3 + 1)}
                    />
                  ))
                }
              </div>
              <div className="portfolio-all-container3">
                {images.length > 0 && 
                  images.filter((_, index) => index % 3 === 2).map((image, filteredIndex) => (
                    <img
                      key={filteredIndex}
                      alt={image.i_id}
                      src={image.i_src}
                      className={`portfolio-all-image1 img-ratio-${filteredIndex % 3 === 0 ? '4-3' : filteredIndex % 3 === 1 ? '1-1' : '16-9'}`}
                      onClick={() => openLightbox(filteredIndex * 3 + 2)}
                    />
                  ))
                }
              </div>
          </div>
        </div> 
      </div>
      {lightboxOpen && (
        <Lightbox
          mainSrc={images[photoIndex].i_src}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={movePrev}
          onMoveNextRequest={moveNext}
        />
      )}
    </div>
  )
}

PortfolioAll.defaultProps = {
  heading1: 'Gallery',
  content1: 'Explore my portfolio to see my latest projects.',
}

PortfolioAll.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
}

export default PortfolioAll
