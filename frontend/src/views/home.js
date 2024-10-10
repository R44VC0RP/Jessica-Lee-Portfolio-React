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
          content="https://utfs.io/f/Ikk25IOqr5UOAwJk7USbO8HN2EYRu3wtifpqJTyUMmgsd0zF"
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <MainNavbar></MainNavbar>
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
            src="/jess_masked_better.png"
            className="home-image"
          />
        </div>
      </div>
      <div className="centered-div ">
        <button className="main-button" onClick={() => window.location.href='/portfolio'}>
          Check out my portfolio!
        </button>
      </div>
      <div id="home-education" className="home-education">
        <span className="home-text04">
          <span>Education</span>
          <br></br>
        </span>
        <SchoolWorkExperiance
          bodyText="Currently attending the University of North Florida (UNF), majoring in Graphic Design."
          timeSpan="3.9 GPA"
          bodyTitle="University of North Florida | Graphic Design"
          businessLogo="/unf_square-200h.png"
          rootClassName="school-work-experiance-root-class-name1"
          bulletPoints={['Completed courses in Drawing 1 & 2, 2D Art and Arrangement, and Digital Imaging and Methods (Adobe Suite)', 'Studied Art History to gain a comprehensive understanding of artistic movements and their impacts', 'Mastered Advanced Typography and Creativity and Critique to enhance design skills and creative thinking', 'Engaged in Process and Methods, focusing on the graphic design process, and Graphic Design Principles to solidify foundational design concepts']}
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Attended Edgewood Jr/Sr High School, excelling academically while actively participating in varsity basketball and golf teams."
          timeSpan="3.6 GPA"
          bodyTitle="Edgewood Jr/Sr High School | Graduated 2022"
          businessLogo="/edgewood_icon-200h.png"
          rootClassName="school-work-experiance-root-class-name"
          bulletPoints={['Varsity Basketball', 'Varsity Golf', 'National Honor Society member', 'Active participant in the National Thespian Society', 'Member of the Tri-M Music Honor Society', 'Served as Editor in Chief of the yearbook for three years. Leading the publication with creativity and organization']}
        ></SchoolWorkExperiance>
      </div>
      <div id="home-experience" className="home-experience">
        <span className="home-text07">
          <span>Experience</span>
          <br></br>
        </span>
        <SchoolWorkExperiance
          bodyText="Head of Marketing at Mandarin 3D Prints, where I created ads, social posts, and other promotional materials."
          timeSpan="2023-Now"
          bodyTitle="Mandarin 3D Prints | Head of Marketing"
          businessLogo="/mandarin3dlogo_curved-200h.png"
          rootClassName="school-work-experiance-root-class-name3"
          bulletPoints={['Created Social Media Posts and Managed Campaigns', 'Created and Managed Promotional Materials', 'Analyzed Marketing Data to Refine Strategies and Optimize Campaign Performance', 'Collaborated with Cross-Functional Teams to Align Marketing Efforts with Business Goals and Customer Needs']}
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Served as Summer Camp Coordinator at Suntree Country Club, overseeing the planning and execution of engaging summer activities for children."
          timeSpan="Seasonal"
          bodyTitle="Suntree Country Club | Summer Camp Coordinator"
          businessLogo="/suntreeheader-200h.png"
          rootClassName="school-work-experiance-root-class-name5"
          bulletPoints={['Designed and implemented a variety of educational and recreational programs', 'Managed camp schedules, coordinating daily activities, field trips, and special events', 'Supervised and trained camp staff, fostering a positive and supportive team environment', 'Ensured the safety and well-being of all campers, adhering to health and safety guidelines', 'Communicated effectively with parents, providing regular updates on camp activities and their children\'s progress']}
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Worked as a server at Red Robin for two years, where I honed exceptional customer service and multitasking skills."
          timeSpan="2022-2023"
          bodyTitle="Red Robin | Server"
          businessLogo="/rrgb-lg-200h.png"
          rootClassName="school-work-experiance-root-class-name4"
          bulletPoints={['Provided a welcoming and friendly dining experience', 'Efficiently managed multiple tables, delivering orders accurately and promptly', 'Developed strong communication and teamwork abilities by collaborating with kitchen staff and fellow servers', 'Maintained high standards of cleanliness and organization to ensure a positive dining atmosphere']}
        ></SchoolWorkExperiance>
        <SchoolWorkExperiance
          bodyText="Worked at Starbucks for two years, where I developed excellent customer service and teamwork skills."
          timeSpan="2020-2022"
          bodyTitle="Starbucks | Coffee Master"
          rootClassName="school-work-experiance-root-class-name2"
          bulletPoints={['Developed excellent customer service and teamwork skills', 'Gained experience in fast-paced environments, managing high volumes of customer orders efficiently', 'Enhanced communication and problem-solving abilities through daily interactions with diverse customers', 'Demonstrated reliability and strong work ethic by consistently meeting sales targets and maintaining high standards of store cleanliness and organization', 'Trained new employees, fostering a collaborative and supportive team atmosphere']}
        ></SchoolWorkExperiance>
      </div>
      <div id="certifications" className="home-certifications">
        <span className="home-text07">
          <span>Certifications</span>
          <br></br>
        </span>
        <Certifications
          timeSpan="2024"
          bodyTitle="CPR Certified"
          businessLogo="/uqykglwy0cj0aepanjhe__93328-200h.jpg"
          rootClassName="certifications-root-class-name9"
        ></Certifications>
        <Certifications
          bodyTitle="Adobe Certified Professional - Illustrator"
          timeSpan="2020"
          businessLogo="/illustrator-badge.svg"
          rootClassName="certifications-root-class-name6"
        ></Certifications>
        <Certifications
          timeSpan="2020"
          bodyTitle="Adobe Certified Professional - Photoshop"
          businessLogo="/photoshop-badge.svg"
          rootClassName="certifications-root-class-name7"
        ></Certifications>
        <Certifications
          timeSpan="2020"
          bodyTitle="Adobe Certified Professional - InDesign"
          businessLogo="/indesign-badge.svg"
          rootClassName="certifications-root-class-name8"
        ></Certifications>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
