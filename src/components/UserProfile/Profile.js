import React, { useState, useEffect } from 'react';
import ShowUserProfile from './ShowUserProfile';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function Profile () {
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
      // Function to handle sidebar visibility based on viewport width
      const handleViewportChange = () => {
          const isMobile = window.matchMedia('(max-width: 991.98px)').matches; // Mobile devices width (Bootstrap's default)
          setIsSidebarOpen(!isMobile); // Set the initial state of the sidebar based on viewport width
      };
      // Call the function initially to set the initial state
      handleViewportChange();
      // Add event listener for window resize
      window.addEventListener('resize', handleViewportChange);
      // Clean up the event listener when component unmounts
      return () => {
          window.removeEventListener('resize', handleViewportChange);
      };
  }, []);
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  return (
      <div className="app-container">
          <Header toggleSidebar={toggleSidebar} />
          <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
              <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
              <main id="main" className='main'>
    <div className="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to = "/">Home</Link>
          </li>
          <li className="breadcrumb-item">User</li>
          <li className="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>
    {/* End Page Title */}
    <ShowUserProfile/>
  </main>
  </div>
  </div>
 
  )
}

export default Profile