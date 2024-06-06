import React from 'react'

import PropTypes from 'prop-types'

import './login1.css'

const Login1 = (props) => {
  return (
    <div className="login1-container thq-section-padding">
      <div className="login1-max-width thq-section-max-width">
        <div className="login1-form-root">
          <div className="login1-form">
            <div className="login1-title-root">
              <h2 className="thq-heading-2">{props.heading1}</h2>
              <div className="login1-have-an-account-login"></div>
            </div>
            <form className="login1-form1">
              <div className="login1-email">
                <label htmlFor="thq-sign-in-1-email" className="thq-body-large">
                  Email
                </label>
                <input
                  type="email"
                  id="thq-sign-in-1-email"
                  required="true"
                  placeholder="Email address"
                  className="login1-textinput thq-input thq-body-large"
                />
              </div>
              <div className="login1-password">
                <div className="login1-container1">
                  <label
                    htmlFor="thq-sign-in-1-password"
                    className="thq-body-large"
                  >
                    Password
                  </label>
                  <div className="login1-hide-password">
                    <svg viewBox="0 0 1024 1024" className="login1-icon">
                      <path d="M317.143 762.857l44.571-80.571c-66.286-48-105.714-125.143-105.714-206.857 0-45.143 12-89.714 34.857-128.571-89.143 45.714-163.429 117.714-217.714 201.714 59.429 92 143.429 169.143 244 214.286zM539.429 329.143c0-14.857-12.571-27.429-27.429-27.429-95.429 0-173.714 78.286-173.714 173.714 0 14.857 12.571 27.429 27.429 27.429s27.429-12.571 27.429-27.429c0-65.714 53.714-118.857 118.857-118.857 14.857 0 27.429-12.571 27.429-27.429zM746.857 220c0 1.143 0 4-0.571 5.143-120.571 215.429-240 432-360.571 647.429l-28 50.857c-3.429 5.714-9.714 9.143-16 9.143-10.286 0-64.571-33.143-76.571-40-5.714-3.429-9.143-9.143-9.143-16 0-9.143 19.429-40 25.143-49.714-110.857-50.286-204-136-269.714-238.857-7.429-11.429-11.429-25.143-11.429-39.429 0-13.714 4-28 11.429-39.429 113.143-173.714 289.714-289.714 500.571-289.714 34.286 0 69.143 3.429 102.857 9.714l30.857-55.429c3.429-5.714 9.143-9.143 16-9.143 10.286 0 64 33.143 76 40 5.714 3.429 9.143 9.143 9.143 15.429zM768 475.429c0 106.286-65.714 201.143-164.571 238.857l160-286.857c2.857 16 4.571 32 4.571 48zM1024 548.571c0 14.857-4 26.857-11.429 39.429-17.714 29.143-40 57.143-62.286 82.857-112 128.571-266.286 206.857-438.286 206.857l42.286-75.429c166.286-14.286 307.429-115.429 396.571-253.714-42.286-65.714-96.571-123.429-161.143-168l36-64c70.857 47.429 142.286 118.857 186.857 192.571 7.429 12.571 11.429 24.571 11.429 39.429z"></path>
                    </svg>
                    <span className="thq-body-small">Hide</span>
                  </div>
                </div>
                <input
                  type="password"
                  id="thq-sign-in-1-password"
                  required="true"
                  placeholder="Password"
                  className="login1-textinput1 thq-input thq-body-large"
                />
              </div>
            </form>
            <div className="login1-container2">
              <div className="login1-container3">
                <button
                  type="submit"
                  className="login1-button thq-button-filled"
                >
                  <span className="login1-text4 thq-body-small">
                    {props.action1}
                  </span>
                </button>
                <div className="login1-terms-agree">
                  <p className="thq-body-large">
                    <span>
                      By continuing, you agree to the Terms of use and Privacy
                      Policy.
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </p>
                </div>
              </div>
              <div className="login1-container4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login1.defaultProps = {
  content1: "Please enter your credentials to access Jessica Lee's profile.",
  action2: 'Forgot password?',
  heading1: 'Welcome back!',
  action1: 'Sign In',
}

Login1.propTypes = {
  content1: PropTypes.string,
  action2: PropTypes.string,
  heading1: PropTypes.string,
  action1: PropTypes.string,
}

export default Login1
