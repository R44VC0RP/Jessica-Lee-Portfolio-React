import React from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import LoginComponent from '../components/login1'
import Footer from '../components/footer'
import './login.css'

const Login = (props) => {
  return (
    <div className="login-container">
      <Helmet>
        <title>Login - Jessica Lee | Graphic Designer</title>
        <meta
          name="description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta
          property="og:title"
          content="Login - Jessica Lee | Graphic Designer"
        />
        <meta
          property="og:description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta
          property="og:image"
          content="https://utfs.io/f/Ikk25IOqr5UOAwJk7USbO8HN2EYRu3wtifpqJTyUMmgsd0zF"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <MainNavbar></MainNavbar>
      <LoginComponent></LoginComponent>
      <Footer></Footer>
    </div>
  )
}

export default Login
