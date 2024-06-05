import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './footer.css'

const Footer = (props) => {
  return (
    <footer
      className={`footer-footer4 thq-section-padding ${props.rootClassName} `}
    >
      <div className="footer-max-width thq-section-max-width">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/" className="footer-navlink">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="footer-image1"
              />
            </Link>
          </div>
          <div className="footer-links">
            {props.links.map((link) => (
              <a
                href={link.href}
                className="thq-body-small thq-link"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="footer-social-links">
            <a
              href="https://www.facebook.com/jessica.hornung.169"
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link"
            >
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="footer-icon thq-icon-small"
              >
                <path
                  d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"
                  className=""
                ></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jessica.5714/"
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link thq-body-small thq-link"
            >
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="footer-icon2 thq-icon-small"
              >
                <path
                  d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
                  className=""
                ></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/jessica-hornung-a522b428a/"
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link thq-body-small thq-link"
            >
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="footer-icon4 thq-icon-small"
              >
                <path
                  d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"
                  className=""
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer-row">
            <div className="footer-footer-links">
              <a
                href="https://exonenterprise.com"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-content3 thq-body-small"
              >
                © 2024 Jessica Lee &amp; Exon Enterprise
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  links: [
    { href: '#home-education', text: 'Education' },
    { href: '#home-experience', text: 'Experience' }
  ],
  logoAlt: 'Jessica Lee Logo',
  cookiesLink: 'Cookies Policy',
  logoSrc: '/jh%20logo-200h.png',
  link1: 'Home',
  privacyLink: 'Privacy Policy',
  termsLink: 'Terms of Use',
  rootClassName: '',
}

Footer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string
  })),
  logoAlt: PropTypes.string,
  cookiesLink: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.string,
  privacyLink: PropTypes.string,
  termsLink: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Footer
