import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../Maindash/Dashboard'

const Sidebar = ({ isOpen, closeSidebar  }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={closeSidebar}>
        {/* <i className="bi bi-x"></i> */}
      </div>
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
      <Link to={"/UserDash"}>
        <a className="nav-link collapsed">
          <i className="bi bi-grid" />
          <span>Dashboard</span>
        </a>
        </Link>
      </li>
    
      <li className="nav-item">
        
        <a
          className="nav-link collapsed"
          data-bs-target="#tables-nav"
          data-bs-toggle="collapse"
          href="#"
        >
          
          <i className="bi bi-layout-text-window-reverse" />
          <span>Machines</span>
          <i className="bi bi-chevron-down ms-auto" />
        </a>
        
        <ul
          id="tables-nav"
          className="nav-content collapse "
          data-bs-parent="#sidebar-nav"
        >
          <li>
          <Link to={"/IndexMachines"}>
            <a href="tables-general.html">
              <i className="bi bi-circle" />
              <span>Fuel Machine</span>
            </a>
            </Link>
          </li>
          
          {/* <li>
            <a href="tables-data.html">
              <i className="bi bi-circle" />
              <span>Machine ID 2</span>
            </a>
          </li>
          <li>
            <a href="tables-data.html">
              <i className="bi bi-circle" />
              <span>Machine ID 3</span>
            </a>
          </li> */}
        </ul>
      </li>
   
  
      
      <li className="nav-heading">Pages</li>
      <li className="nav-item">
      <Link to ="/Profile" >
        <a className="nav-link collapsed">
          <i className="bi bi-person" />
         <span>Profile</span> 
        </a>
        </Link> 
      </li>
     
      <Link to ="/AssignFuelCapacity" >
      <li className="nav-item">
        <a className="nav-link collapsed" >
          <i className="bi bi-gear" />
          <span>Machine Settings</span>
        </a>
      </li>
      </Link>
    
      <li className="nav-item">
        <a className="nav-link collapsed" >
          <i className="bi bi-envelope" />
          <span>Contact</span>
        </a>
      </li>

      <Link to ="/IndexGenerateReport" >
      <li className="nav-item">
        <a className="nav-link collapsed" >
          <i className="bi bi-card-list" />
          <span>Reports</span>
        </a>
      </li>
      </Link>
      

      <li className="nav-item">
        <Link to={"/"}>
        <a className="nav-link collapsed" href="pages-login.html">
          <i className="bi bi-box-arrow-in-right" />
          <span>Logout</span>
        </a>
        </Link>
      </li>
     
    </ul>
  </aside>



  )
}

export default Sidebar