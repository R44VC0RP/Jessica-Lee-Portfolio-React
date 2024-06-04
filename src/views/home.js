import React from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import SchoolWorkExperiance from '../components/school-work-experiance'
import Certifications from '../components/certifications'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Jessica Lee | Graphic Designer</title>
        <meta
          name="description"
          content="Hello, my name is Jessica. I am a highly skilled graphic designer and digital artist with a keen eye for creative detail."
        />
        <meta property="og:title" content="Jessica Lee | Graphic Designer" />
        <meta
          property="og:description"
          content="Hello, my name is Jessica. I am a highly skilled graphic designer and digital artist with a keen eye for creative detail."
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
        rootClassName="main-navbar-root-class-name"
      ></MainNavbar>
      <div className="home-hero-section">
        <span className="home-header-top-a">HELLO I&apos;M</span>
        <span className="home-header-name-b">Jessica Lee</span>
        <span className="home-header-description-c">
          <span>GRAPHIC &amp;</span>
          <br></br>
          <span>SOCIAL DESIGNER</span>
          <br></br>
        </span>
        <div className="home-background-rectangle">
          <img
            alt="image"
            src="/pretty_jess_v2-1400h.png"
            className="home-image"
          />
        </div>
      </div>
      <div id="aboutmestart" className="home-education">
        <span className="home-text04">
          <span>Education</span>
          <br></br>
        </span>
        <SchoolWorkExperiance
          bodyText="Currently attending the University of North Florida (UNF), majoring in Graphic Design.  Completed courses including Drawing 1 &amp; 2, 2D Art and Arrangement, and Digital Imaging and Methods (Adobe suite). Studied Art History to gain a comprehensive understanding of artistic movements and their impacts. Mastered Advanced Typography and Creativity and Critique to enhance design skills and creative thinking. Engaged in Process and Methods, focusing on the graphic design process, and Graphic Design Principles to solidify foundational design concepts."
          timeSpan="3.9 GPA"
          bodyTitle="University of North Florida | Graphic Design"
          businessLogo="/unf_square-200h.png"
          rootClassName="school-work-experiance-root-class-name1"
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Attended Edgewood High School, excelling academically while actively participating in varsity basketball and golf teams.  National Honor Society member, demonstrating a commitment to academic excellence and community service. Active participant in the National Thespian Society, showcasing a passion for the performing arts. Member of the Tri-M Music Honor Society, highlighting dedication to music and academic achievement. Served as Editor in Chief of the yearbook for three years, leading the publication with creativity and organization."
          timeSpan="3.6 GPA"
          bodyTitle="Edgewood High School - Merrit Island"
          businessLogo="/edgewood_icon-200h.png"
          rootClassName="school-work-experiance-root-class-name"
        ></SchoolWorkExperiance>
      </div>
      <div id="experience" className="home-experience">
        <span className="home-text07">
          <span>Experience</span>
          <br></br>
        </span>
        <SchoolWorkExperiance
          bodyText="Head of Marketing at Mandarin 3D Prints, where I created ads, social posts, and other promotional materials.  Designed and executed marketing campaigns to increase brand awareness and drive sales. Managed social media accounts, creating engaging content that boosted follower engagement and growth. Developed promotional items and materials, effectively communicating the brand’s value proposition. Analyzed marketing data to refine strategies and optimize campaign performance. Collaborated with cross-functional teams to align marketing efforts with business goals and customer needs."
          timeSpan="2023-Now"
          bodyTitle="Mandarin 3D Prints | Head of Marketing"
          businessLogo="/mandarin3dlogo_curved-200h.png"
          rootClassName="school-work-experiance-root-class-name3"
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Served as Summer Camp Coordinator at Suntree Country Club, overseeing the planning and execution of engaging summer activities for children.  Designed and implemented a variety of educational and recreational programs, ensuring a fun and enriching camp experience. Managed camp schedules, coordinating daily activities, field trips, and special events. Supervised and trained camp staff, fostering a positive and supportive team environment. Ensured the safety and well-being of all campers, adhering to health and safety guidelines. Communicated effectively with parents, providing regular updates on camp activities and their children's progress."
          timeSpan="2023-Now"
          bodyTitle="Suntree Country Club | Summer Camp Coordinator"
          businessLogo="/suntreeheader-200h.png"
          rootClassName="school-work-experiance-root-class-name5"
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Worked as a server at Red Robin for two years, where I honed exceptional customer service and multitasking skills.  Provided a welcoming and friendly dining experience, ensuring customer satisfaction and repeat business. Efficiently managed multiple tables, delivering orders accurately and promptly in a fast-paced environment. Developed strong communication and teamwork abilities by collaborating with kitchen staff and fellow servers. Upsold menu items and promotions, contributing to increased sales and customer engagement. Maintained high standards of cleanliness and organization to ensure a positive dining atmosphere."
          timeSpan="2022-2023"
          bodyTitle="Red Robin | Server"
          businessLogo="/rrgb-lg-200h.png"
          rootClassName="school-work-experiance-root-class-name4"
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Worked at Starbucks for two years, where I developed excellent customer service and teamwork skills.  Gained experience in fast-paced environments, managing high volumes of customer orders efficiently. Enhanced communication and problem-solving abilities through daily interactions with diverse customers. Demonstrated reliability and strong work ethic by consistently meeting sales targets and maintaining high standards of store cleanliness and organization. Trained new employees, fostering a collaborative and supportive team atmosphere."
          timeSpan="2020-2022"
          bodyTitle="Starbucks | Coffee Master"
          rootClassName="school-work-experiance-root-class-name2"
        ></SchoolWorkExperiance>
      </div>
      <div id="certifications" className="home-certifications">
        <span className="home-text10">
          <span>Certifications</span>
          <br></br>
        </span>
        <Certifications
          timeSpan="2020"
          businessLogo="/illustrator-badge.svg"
          rootClassName="certifications-root-class-name6"
        ></Certifications>
        <Certifications
          timeSpan="2020"
          bodyTitle="ACP - Adobe Certified Professional - Photoshop"
          businessLogo="/photoshop-badge.svg"
          rootClassName="certifications-root-class-name7"
        ></Certifications>
        <Certifications
          timeSpan="2020"
          bodyTitle="ACP - Adobe Certified Professional - InDesign"
          businessLogo="/indesign-badge.svg"
          rootClassName="certifications-root-class-name8"
        ></Certifications>
        <Certifications
          timeSpan="2024"
          bodyTitle="CPR Certified"
          businessLogo="/uqykglwy0cj0aepanjhe__93328-200h.jpg"
          rootClassName="certifications-root-class-name9"
        ></Certifications>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Home
