import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Url';

function DataCards() {
  const [machinesData, setMachinesData] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);
  const [MachineInfo, setMachineInfo] = useState(() => {
    const savedMachineInfo = localStorage.getItem('MachineInfo');
    const cacheTimestamp = localStorage.getItem('MachineInfoTimestamp');
    const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 180000; // Cache valid for 3 minutes

    return savedMachineInfo && isCacheValid ? JSON.parse(savedMachineInfo) : '';
  });

  const location = useLocation();
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    if (globalState && !MachineInfo) {
      fetchMachineInfo(globalState);
    }
  }, [location, globalState, MachineInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globalState) {
        fetchMachineInfo(globalState, true);
      }
    }, 180000); // Refresh every 3 minutes

    return () => clearInterval(interval);
  }, [globalState]);

  const fetchMachineInfo = async (globalState, forceRefresh = false) => {
    try {
      const cacheTimestamp = localStorage.getItem('MachineInfoTimestamp');
      const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 180000; // Cache valid for 3 minutes

      if (isCacheValid && !forceRefresh) return; // Skip fetching if cache is valid and not forced

      const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
      const data = response.data;

      if (data.success) {
        setMachineInfo(data);
        localStorage.setItem('MachineInfo', JSON.stringify(data)); // Cache the data in localStorage
        localStorage.setItem('MachineInfoTimestamp', Date.now().toString()); // Update cache timestamp
      }
    } catch (error) {
      console.error('Error fetching machine info:', error);
    }
  };

  return (
    <div className="col-lg-4">
      <div className="row">
        <div className="col-xxl-4 col-xl-12">
          <div className="card info-card customers-card">
            <div className="card-body">
              <h5 className="card-title">
                Total Machines <span>| </span>
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-people" />
                </div>
                <div className="ps-3">
                  <h6>{MachineInfo.machine_count}</h6>
                  <span className="text-muted small pt-2 ps-1">
                    {MachineInfo.machine_type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-12">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Today
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Month
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Year
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Fuel Saved <span>| Today</span>
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cart" />
                </div>
                <div className="ps-3">
                  <h6>14.5 Lt</h6>
                  <span className="text-success small pt-1 fw-bold">12%</span>{" "}
                  <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-12">
          <div className="card info-card revenue-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Today
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Month
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Year
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Money Saved <span>| This Month</span>
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-currency-dollar" />
                </div>
                <div className="ps-3">
                  <h6> ₹3026</h6>
                  <span className="text-success small pt-1 fw-bold">8%</span>{" "}
                  <span className="text-muted small pt-2 ps-1">increase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-12">
          <div className="card recent-sales overflow-auto">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Today
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Month
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    This Year
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default DataCards;
