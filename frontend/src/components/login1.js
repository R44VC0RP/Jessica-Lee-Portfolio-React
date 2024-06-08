import React, { useState, useEffect } from 'react'
import axios from 'axios'; // Ensure axios is installed and imported

import PropTypes from 'prop-types'

import './login1.css'

const LoginComponent = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfileName, setUserProfileName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/admin';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');  // Debugging statement
    try {
      const response = await axios.post('/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', username);
      localStorage.setItem('userProfileName', response.data.userProfileName);
      console.log(response.data)
      localStorage.setItem('userImage', response.data.userImage);
      // Redirect to the desired route
      window.location.href = '/admin';
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Login failed. Please check your credentials and try again.'); // Set error message
    }
  };

  return (
    <div className="login1-container thq-section-padding">
      <div className="login1-max-width thq-section-max-width">
        <div className="login1-form-root">
          <div className="login1-form">
            <div className="login1-title-root">
              <h2 className="thq-heading-2">Admin Management</h2>
              <div className="login1-have-an-account-login"></div>
            </div>
            
            {errorMessage && (
              <div className="login1-error-message">
                <p className="thq-body-small">{errorMessage}</p>
              </div>
            )}
            <form className="login1-form1" onSubmit={handleSubmit}>
              <div className="login1-email">
                <label htmlFor="thq-sign-in-1-email" className="thq-body-large">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  id="thq-sign-in-1-email"
                  required
                  placeholder="Username"
                  className="login1-textinput thq-input thq-body-large"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                </div>
                <input
                  name="password"
                  type="password"
                  id="thq-sign-in-1-password"
                  required
                  placeholder="Password"
                  className="login1-textinput1 thq-input thq-body-large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login1-container2">
                <div className="login1-container3">
                  <button
                    type="submit"
                    className="login1-button thq-button-filled"
                  >
                    <span className="login1-text4 thq-body-small">
                      Login
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginComponent.defaultProps = {
  content1: "Please enter your credentials to access Jessica Lee's profile.",
  action2: 'Forgot password?',
  heading1: 'Welcome back!',
  action1: 'Sign In',
}

LoginComponent.propTypes = {
  content1: PropTypes.string,
  action2: PropTypes.string,
  heading1: PropTypes.string,
  action1: PropTypes.string,
}

export default LoginComponent
