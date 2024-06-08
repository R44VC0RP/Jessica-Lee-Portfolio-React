import React, { useState } from 'react'

import { Helmet } from 'react-helmet'

import MainNavbar from '../components/main-navbar'
import VerticalNavButton from '../components/vertical-nav-button'
import ProjectItem from '../components/project-item'
import AdminOptions from '../components/admin/adminoptions'

import './admin-management.css'

const AdminManagement = (props) => {
  const [activeComponent, setActiveComponent] = useState('dashboard')

  return (
    <div className="admin-management-container">
      <Helmet>
        <title>Admin Management</title>
        <meta
          name="description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta
          property="og:title"
          content="Admin-Management - Jessica Lee | Graphic Designer"
        />
        <meta
          property="og:description"
          content="This is the showcase of my life and graphic design portfolio; feel free to contact me if you have any projects or ideas!"
        />
        <meta
          property="og:image"
          content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/ace773d9-65a9-44ba-ac39-707201869c92/78be31de-57a6-476c-9018-cdd8ef481839?org_if_sml=1&amp;force_format=original"
        />
      </Helmet>
      <MainNavbar></MainNavbar>
      <div className="admin-management-container1">
        <span className="admin-management-text">
          Hi Jess, welcome to your dashboard:
        </span>
      </div>
      <div className="admin-management-assets">
        <div className="admin-management-vertical-nav">
          <span className="admin-management-text1">Menu</span>
          <VerticalNavButton
            buttonLink="#"
            buttonText="Dashboard"
            rootClassName="vertical-nav-button-root-class-name"
            onClick={() => setActiveComponent('dashboard')}
            isActive={activeComponent === 'dashboard'}
          ></VerticalNavButton>
          <VerticalNavButton
            buttonLink="#"
            buttonText="Projects"
            rootClassName="vertical-nav-button-root-class-name2"
            onClick={() => setActiveComponent('projects')}
            isActive={activeComponent === 'projects'}
          ></VerticalNavButton>
          <VerticalNavButton
            buttonLink="#"
            buttonText="Website Control"
            rootClassName="vertical-nav-button-root-class-name1"
            onClick={() => setActiveComponent('control')}
            isActive={activeComponent === 'control'}
          ></VerticalNavButton>
          <VerticalNavButton
            buttonLink="#"
            buttonText="Admin Options"
            rootClassName="vertical-nav-button-root-class-name3"
            onClick={() => setActiveComponent('options')}
            isActive={activeComponent === 'options'}
          ></VerticalNavButton>
        </div>
        <div className="admin-management-items">
          {activeComponent === 'dashboard' && (
            <div id="dashboard_hud" className="admin-management-dashboard">
              <div className="admin-management-container2">
                <img
                  alt="image"
                  src="https://i.sstatic.net/veUID.png"
                  className="admin-management-image"
                />
              </div>
              <div className="admin-management-container3">
                <img
                  alt="image"
                  src="https://s3.amazonaws.com/ezoic-site-content/blog/wp-content/uploads/2017/11/07091822/Key-Charts-Pubtelligence-16.jpg"
                  className="admin-management-image1"
                />
              </div>
            </div>
          )}
          {activeComponent === 'projects' && (
            <div id="projects_hud" className="admin-management-projects">
              <span className="admin-management-text2">You have x Projects</span>
              <ProjectItem rootClassName="project-item-root-class-name4"></ProjectItem>
              <ProjectItem rootClassName="project-item-root-class-name5"></ProjectItem>
            </div>
          )}
          {activeComponent === 'control' && (
            <div id="control_hud" className="admin-management-control">
              {/* Add your Website Control component here */}
            </div>
          )}
          {activeComponent === 'options' && (
            <div id="options_hud" className="admin-management-options" style={{ overflowY: 'auto', height: '100%', width: '100%' }}>
              <AdminOptions></AdminOptions>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminManagement
