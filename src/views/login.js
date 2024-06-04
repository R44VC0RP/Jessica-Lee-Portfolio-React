import React from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import Login1 from '../components/login1'
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
          content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/ace773d9-65a9-44ba-ac39-707201869c92/78be31de-57a6-476c-9018-cdd8ef481839?org_if_sml=1&amp;force_format=original"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <MainNavbar
        link4="Contact"
        linkB="Portfolio"
        linkC="Resume"
        linkA="About Me"
        action1="View Portfolio"
        logoAlt="Jessica Lee Logo"
        rootClassName="main-navbar-root-class-name1"
      ></MainNavbar>
      <Login1></Login1>
      <Footer rootClassName="footer-root-class-name2"></Footer>
    </div>
  )
}

export default Login
