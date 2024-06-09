

import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { API_URL } from '../constants/Url';



function ScanOptions() {
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

  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const [user_id, setUserId] = useState('');
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Use the OR operator to provide a default value if 'user_id' is not found in the params
    // setUserId(params.get('user_id') || "1");
    // setUserId(location.state?.user_id);
    // const password = params.get('password');

    if (globalState) {
      fetchUserInfo(globalState);
      // setGlobalUserId(user_id);
    }
    // else{
    //   setUserId(getGlobalUserId());
    // }
  }, [location]); // Include 'user_id' in the dependency array
  const fetchUserInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user/${globalState}`);
      const data = response.data;

      console.log('User Info:', data); // Log user data received from the server

      if (data.success) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="app-container">
      
      <Header toggleSidebar={toggleSidebar} user_id={globalState} />
      <div className={`content ${isSidebarOpen && window.innerWidth > 991.98 ? 'content-shifted' : ''}`}>
        <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} user_id={user_id} />
      <br/>
      <br/>
      <div className="container">
      <h1 className="text-center mt-5 mb-4">Scan Options</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-center mb-4">
            <Link to="/MriScan">
            <div className="card-body">
              <h5 className="card-title">Scan MRI Image</h5>
              <p className="card-text">Get information about MRI scan and type of tumor.</p>
              <button className="btn btn-primary">Scan MRI</button>
            </div>
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-4">
          <Link to="/ChestScan">
            <div className="card-body">
              <h5 className="card-title">Chest X-ray Scan</h5>
              <p className="card-text">Get information about chest X-ray scan and abnormalities.</p>
              <button className="btn btn-primary">Scan X-ray</button>
            </div>
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Bone Fracture Scanner</h5>
              <p className="card-text">Scan for bone fractures and get detailed report.</p>
              <button className="btn btn-primary">Scan Bones</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
    </div>
  );
}


export default ScanOptions;




