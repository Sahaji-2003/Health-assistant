import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Url';
import { GlobalStateProvider } from '../constants/GlobalStateProvider';

const Header = ({ toggleSidebar, user_id }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize state from localStorage, if available
    const savedUserInfo = localStorage.getItem('userInfo');
    const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
    const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

    return savedUserInfo && isCacheValid ? JSON.parse(savedUserInfo) : null;
  });

  const location = useLocation();

  useEffect(() => {
    if (user_id && !userInfo) {
      fetchUserInfo(user_id);
    }
  }, [location, user_id, userInfo]); // Include 'user_id' and 'userInfo' in the dependency array

  useEffect(() => {
    const interval = setInterval(() => {
      if (user_id) {
        fetchUserInfo(user_id, true);
      }
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [user_id]);

  const fetchUserInfo = async (user_id, forceRefresh = false) => {
    try {
      const cacheTimestamp = localStorage.getItem('userInfoTimestamp');
      const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 300000; // Cache valid for 5 minutes

      if (isCacheValid && !forceRefresh) return; // Skip fetching if cache is valid and not forced

      const response = await axios.get(`${API_URL}/api/auth/user/${user_id}`);
      const data = response.data;

      if (data.success) {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data)); // Cache the data in localStorage
        localStorage.setItem('userInfoTimestamp', Date.now().toString()); // Update cache timestamp
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a className="logo d-flex align-items-center">
          {/* Logo of sigmatronics innovation */}
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">Sigmatronics </span>
        </a>
        <div className="header-toggle" onClick={toggleSidebar}>
          <i className="bi bi-list toggle-sidebar-btn" /> {/* Icon to toggle the sidebar */}
        </div>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search" />
            </a>
          </li>
          {/* End Search Icon */}
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell" />
              <span className="badge bg-primary badge-number">4</span>
            </a>
            {/* End Notification Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning" />
                <div>
                  <h4>Fuel Leakage</h4>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger" />
                <div>
                  <h4>Fuel Very Low</h4>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success" />
                <div>
                  <h4>Refilled</h4>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary" />
                <div>
                  <h4>Timer out</h4>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
            {/* End Notification Dropdown Items */}
          </li>
          {/* End Notification Nav */}
          <li className="nav-item dropdown"></li>
          {/* End Messages Nav */}
          {userInfo && (
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
              >
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: '22px', color: 'blue' }}
                ></i>
                <b>
                  <span className="d-none d-md-block dropdown-toggle ps-2" style={{ fontSize: '18px'}}>
                    {userInfo.fullName}
                  </span>
                </b>

              </a>
              {/* End Profile Image Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>
                    {userInfo.fullName} 
                  </h6>
                  <h5>{userInfo.user_id}</h5>
                  <span>{userInfo.age}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
