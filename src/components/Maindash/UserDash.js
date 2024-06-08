import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from './Dashboard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { API_URL } from '../constants/Url';

function UserDash() {
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
      <Dashboard user_id={user_id}/>
      {/* <h1> {globalState}</h1> */}
    </div>
    </div>
  );
}

export default UserDash;
