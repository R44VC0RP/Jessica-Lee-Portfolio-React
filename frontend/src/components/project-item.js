import React from 'react'

import PropTypes from 'prop-types'

import ButtonSelection from './button-selection'
import './project-item.css'

const ProjectItem = (props) => {
  return (
    <div className={`project-item-container ${props.rootClassName} `}>
      <div className="project-item-container1">
        <div className="project-item-container2">
          <div className="project-item-container3">
            <img
              alt={props.imageAlt}
              src={props.imageSrc}
              className="project-item-image"
            />
            <span className="project-item-text">{props.photosInProject}</span>
          </div>
          <div className="project-item-container4">
            <span className="project-item-text1">{props.projectTitle}</span>
            <span className="">{props.projectDescription}</span>
          </div>
          <div className="project-item-container5">
            <ButtonSelection
              buttonText="Edit"
              rootClassName="button-selection-root-class-name5"
              className=""
            ></ButtonSelection>
            <ButtonSelection
              buttonText="Delete"
              rootClassName="button-selection-root-class-name6"
              className=""
            ></ButtonSelection>
          </div>
        </div>
      </div>
    </div>
  )
}

ProjectItem.defaultProps = {
  projectTitle: 'Project Title',
  imageSrc: 'https://play.teleporthq.io/static/svg/default-img.svg',
  photosInProject: '4 Photos',
  button: 'Button',
  projectDescription: 'Text',
  buttonText: 'Click Me',
  imageAlt: 'image',
  rootClassName: '',
}

ProjectItem.propTypes = {
  projectTitle: PropTypes.string,
  imageSrc: PropTypes.string,
  photosInProject: PropTypes.string,
  button: PropTypes.string,
  projectDescription: PropTypes.string,
  buttonText: PropTypes.string,
  imageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default ProjectItem
