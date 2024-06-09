// import React from 'react'
// import { Link } from 'react-router-dom'
// import Dashboard from '../Maindash/Dashboard'

// const Sidebar = ({ isOpen, closeSidebar  }) => {
//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <div className="sidebar-toggle" onClick={closeSidebar}>
//         {/* <i className="bi bi-x"></i> */}
//       </div>
//     <ul className="sidebar-nav" id="sidebar-nav">
//       <li className="nav-item">
//       <Link to={"/UserDash"}>
//         <a className="nav-link collapsed">
//           <i className="bi bi-grid" />
//           <span>Dashboard</span>
//         </a>
//         </Link>
//       </li>
    
//       <li className="nav-item">
        
//         <a
//           className="nav-link collapsed"
//           data-bs-target="#tables-nav"
//           data-bs-toggle="collapse"
//           href="#"
//         >
          
//           <i className="bi bi-layout-text-window-reverse" />
//           <span>Health Index</span>
//           <i className="bi bi-chevron-down ms-auto" />
//         </a>
        
//         <ul
//           id="tables-nav"
//           className="nav-content collapse "
//           data-bs-parent="#sidebar-nav"
//         >
//           <li>
//           <Link to={"/IndexMachines"}>
//             <a href="tables-general.html">
//               <i className="bi bi-circle" />
//               <span>Fuel Machine</span>
//             </a>
//             </Link>
//           </li>
          
//           {/* <li>
//             <a href="tables-data.html">
//               <i className="bi bi-circle" />
//               <span>Machine ID 2</span>
//             </a>
//           </li>
//           <li>
//             <a href="tables-data.html">
//               <i className="bi bi-circle" />
//               <span>Machine ID 3</span>
//             </a>
//           </li> */}
//         </ul>
//       </li>
   
  
      
//       <li className="nav-heading">Pages</li>
//       <li className="nav-item">
//       <Link to ="/Profile" >
//         <a className="nav-link collapsed">
//           <i className="bi bi-person" />
//          <span>Profile</span> 
//         </a>
//         </Link> 
//       </li>
     
//       <Link to ="/AssignFuelCapacity" >
//       <li className="nav-item">
//         <a className="nav-link collapsed" >
//           <i className="bi bi-gear" />
//           <span>AI Doctor</span>
//         </a>
//       </li>
//       </Link>
    
//     <Link to="/ChatHome">
//       <li className="nav-item">
//         <a className="nav-link collapsed" >
//           <i className="bi bi-envelope" />
//           <span>Doctor Consultancy</span>
//         </a>
//       </li>
//       </Link>

//       <Link to ="/IndexGenerateReport" >
//       <li className="nav-item">
//         <a className="nav-link collapsed" >
//           <i className="bi bi-card-list" />
//           <span>Medical Reports</span>
//         </a>
//       </li>
//       </Link>
      

//       <li className="nav-item">
//         <Link to={"/"}>
//         <a className="nav-link collapsed" href="pages-login.html">
//           <i className="bi bi-box-arrow-in-right" />
//           <span>Logout</span>
//         </a>
//         </Link>
//       </li>
     
//     </ul>
//   </aside>



//   )
// }

// export default Sidebar

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const sidebarStyles = {
    backgroundColor: '#ffe6e6', // Light pink color
    width: '310px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '30px',
    transition: 'transform 0.3s ease-in-out',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    overflowY: 'auto'
  };

  const navItemStyles = {
    padding: '10px 20px'
  };

  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    textDecoration: 'none'
  };

  const navLinkHoverStyles = {
    backgroundColor: '#f1f1f1'
  };

  const iconStyles = {
    marginRight: '10px'
  };

  return (
    <aside className="sidebar" style={sidebarStyles}>
      <div className="sidebar-toggle" onClick={closeSidebar}>
        {/* <i className="bi bi-x"></i> */}
      </div>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item" style={navItemStyles}>
          <Link to="/UserDash">
            <a className="nav-link collapsed" style={navLinkStyles}>
              <i className="bi bi-grid" style={iconStyles} />
              <span>Dashboard</span>
            </a>
          </Link>
        </li>

        <li className="nav-item" style={navItemStyles}>
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
            style={navLinkStyles}
          >
            <i className="bi bi-layout-text-window-reverse" style={iconStyles} />
            <span>Health Index</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>

          <ul
            id="tables-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/IndexMachines">
                <a href="tables-general.html" style={navLinkStyles}>
                  <i className="bi bi-circle" style={iconStyles} />
                  <span>Fuel Machine</span>
                </a>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-heading">Pages</li>
        <li className="nav-item" style={navItemStyles}>
          <Link to="/Profile">
            <a className="nav-link collapsed" style={navLinkStyles}>
              <i className="bi bi-person" style={iconStyles} />
              <span>Profile</span>
            </a>
          </Link>
        </li>

        <Link to="/AssignFuelCapacity">
          <li className="nav-item" style={navItemStyles}>
            <a className="nav-link collapsed" style={navLinkStyles}>
              <i className="bi bi-gear" style={iconStyles} />
              <span>User Settings</span>
            </a>
          </li>
        </Link>
         <Link to="/ChatHome">
        <li className="nav-item" style={navItemStyles}>
          <a className="nav-link collapsed" style={navLinkStyles}>
            <i className="bi bi-envelope" style={iconStyles} />
            <span>Doctor Consultancy</span>
          </a>
        </li>
        </Link>

        <Link to="/IndexGenerateReport">
          <li className="nav-item" style={navItemStyles}>
            <a className="nav-link collapsed" style={navLinkStyles}>
              <i className="bi bi-card-list" style={iconStyles} />
              <span>Reports</span>
            </a>
          </li>
        </Link>

        <li className="nav-item" style={navItemStyles}>
          <Link to="/">
            <a className="nav-link collapsed" style={navLinkStyles}>
              <i className="bi bi-box-arrow-in-right" style={iconStyles} />
              <span>Logout</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;