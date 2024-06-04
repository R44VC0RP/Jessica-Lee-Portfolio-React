import React from 'react'

import PropTypes from 'prop-types'

import './primary-contact.css'

const PrimaryContact = (props) => {
  return (
    <div
      id={props.contactID}
      className="primary-contact-contact9 thq-section-padding"
    >
      <div className="thq-flex-row thq-section-max-width primary-contact-max-width">
        <img
          alt={props.imageAlt}
          src={props.imageSrc}
          className="primary-contact-image1 thq-img-ratio-4-3"
        />
        <div className="primary-contact-content thq-flex-column">
          <div className="primary-contact-section-title thq-card">
            <div className="primary-contact-content1">
              <h2 className="thq-heading-2">{props.heading1}</h2>
            </div>
          </div>
          <form className="thq-card">
            <div className="primary-contact-input">
              <label htmlFor="contact-form-3-name" className="thq-body-small">
                Name
              </label>
              <input
                type="text"
                id="contact-form-3-name"
                placeholder="Name"
                className="thq-input"
              />
            </div>
            <div className="primary-contact-input1">
              <label htmlFor="contact-form-3-email" className="thq-body-small">
                Email
              </label>
              <input
                type="email"
                id="contact-form-3-email"
                required="true"
                placeholder="Email"
                className="thq-input"
              />
            </div>
            <div className="primary-contact-container">
              <label
                htmlFor="contact-form-3-message"
                className="thq-body-small"
              >
                Message
              </label>
              <textarea
                id="contact-form-3-message"
                rows="3"
                placeholder="Enter your message"
                className="thq-input"
              ></textarea>
            </div>
            <div className="primary-contact-checkbox">
              <input
                type="checkbox"
                id="contact-form-3-check"
                checked="true"
                required="true"
                className="thq-checkbox"
              />
              <label
                htmlFor="contact-form-3-check"
                className="primary-contact-text4 thq-body-small"
              >
                I accept the Terms
              </label>
            </div>
            <button
              type="submit"
              className="primary-contact-button thq-button-filled"
            >
              <span className="thq-body-small">{props.action}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

PrimaryContact.defaultProps = {
  heading1: 'Contact Me!',
  contactID: 'primarycontact',
  imageSrc:
    'https://images.unsplash.com/photo-1572274407649-6cb883740677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNzQ1OTI4Mnw&ixlib=rb-4.0.3&q=80&w=1080',
  action: 'Submit',
  imageAlt: 'Image1',
}

PrimaryContact.propTypes = {
  heading1: PropTypes.string,
  contactID: PropTypes.string,
  imageSrc: PropTypes.string,
  action: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default PrimaryContact
