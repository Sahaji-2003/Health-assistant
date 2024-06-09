// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../constants/GlobalStateProvider';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL } from '../constants/Url';

// function DataCards() {
//   const [machinesData, setMachinesData] = useState([]);
//   const [channelInfo, setChannelInfo] = useState([]);
//   const [MachineInfo, setMachineInfo] = useState(() => {
//     const savedMachineInfo = localStorage.getItem('MachineInfo');
//     const cacheTimestamp = localStorage.getItem('MachineInfoTimestamp');
//     const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 180000; // Cache valid for 3 minutes

//     return savedMachineInfo && isCacheValid ? JSON.parse(savedMachineInfo) : '';
//   });

//   const location = useLocation();
//   const { getGlobal, setGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     if (globalState && !MachineInfo) {
//       fetchMachineInfo(globalState);
//     }
//   }, [location, globalState, MachineInfo]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (globalState) {
//         fetchMachineInfo(globalState, true);
//       }
//     }, 180000); // Refresh every 3 minutes

//     return () => clearInterval(interval);
//   }, [globalState]);

//   const fetchMachineInfo = async (globalState, forceRefresh = false) => {
//     try {
//       const cacheTimestamp = localStorage.getItem('MachineInfoTimestamp');
//       const isCacheValid = cacheTimestamp && (Date.now() - cacheTimestamp) < 180000; // Cache valid for 3 minutes

//       if (isCacheValid && !forceRefresh) return; // Skip fetching if cache is valid and not forced

//       const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
//       const data = response.data;

//       if (data.success) {
//         setMachineInfo(data);
//         localStorage.setItem('MachineInfo', JSON.stringify(data)); // Cache the data in localStorage
//         localStorage.setItem('MachineInfoTimestamp', Date.now().toString()); // Update cache timestamp
//       }
//     } catch (error) {
//       console.error('Error fetching machine info:', error);
//     }
//   };

//   return (
//     <div className="col-lg-4">
//       <div className="row">
//         <div className="col-xxl-4 col-xl-12">
//           <div className="card info-card customers-card">
//             <div className="card-body">
//               <h5 className="card-title">
//                 Total Machines <span>| </span>
//               </h5>
//               <div className="d-flex align-items-center">
//                 <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                   <i className="bi bi-people" />
//                 </div>
//                 <div className="ps-3">
//                   <h6>{MachineInfo.machine_count}</h6>
//                   <span className="text-muted small pt-2 ps-1">
//                     {MachineInfo.machine_type}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xxl-4 col-md-12">
//           <div className="card info-card sales-card">
//             <div className="filter">
//               <a className="icon" href="#" data-bs-toggle="dropdown">
//                 <i className="bi bi-three-dots" />
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                 <li className="dropdown-header text-start">
//                   <h6>Filter</h6>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Today
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Month
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Year
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="card-body">
//               <h5 className="card-title">
//                 Fuel Saved <span>| Today</span>
//               </h5>
//               <div className="d-flex align-items-center">
//                 <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                   <i className="bi bi-cart" />
//                 </div>
//                 <div className="ps-3">
//                   <h6>14.5 Lt</h6>
//                   <span className="text-success small pt-1 fw-bold">12%</span>{" "}
//                   <span className="text-muted small pt-2 ps-1">increase</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xxl-4 col-md-12">
//           <div className="card info-card revenue-card">
//             <div className="filter">
//               <a className="icon" href="#" data-bs-toggle="dropdown">
//                 <i className="bi bi-three-dots" />
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                 <li className="dropdown-header text-start">
//                   <h6>Filter</h6>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Today
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Month
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Year
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="card-body">
//               <h5 className="card-title">
//                 Money Saved <span>| This Month</span>
//               </h5>
//               <div className="d-flex align-items-center">
//                 <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                   <i className="bi bi-currency-dollar" />
//                 </div>
//                 <div className="ps-3">
//                   <h6> ₹3026</h6>
//                   <span className="text-success small pt-1 fw-bold">8%</span>{" "}
//                   <span className="text-muted small pt-2 ps-1">increase</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="col-12">
//           <div className="card recent-sales overflow-auto">
//             <div className="filter">
//               <a className="icon" href="#" data-bs-toggle="dropdown">
//                 <i className="bi bi-three-dots" />
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                 <li className="dropdown-header text-start">
//                   <h6>Filter</h6>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     Today
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Month
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     This Year
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default DataCards;


// import React from 'react';

// function DataCards() {
//   const machineInfo = {
//     doctorConsultancy: { count: 10, type: 'Doctor Consultancy' },
//     aiDoctor: { count: 5, type: 'AI Doctor' },
//     reportsScanner: { count: 3, type: 'Reports Scanner' }
//   };

//   return (
//     <div className="col-lg-4">
//       <div className="row">
//         {Object.keys(machineInfo).map((key, index) => (
//           <div key={index} className="col-xxl-4 col-xl-12">
//             <div className="card info-card">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   Total {machineInfo[key].type} <span>| </span>
//                 </h5>
//                 <div className="d-flex align-items-center">
//                   <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                     {key === 'doctorConsultancy' && <i className="bi bi-person" />}
//                     {key === 'aiDoctor' && <i className="bi bi-journal-medical" />}
//                     {key === 'reportsScanner' && <i className="bi bi-image" />}
//                   </div>
//                   <div className="ps-3">
//                     <h6>{machineInfo[key].count}</h6>
//                     <span className="text-muted small pt-2 ps-1">
//                       {machineInfo[key].type}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DataCards;

import React from 'react';

function DataCards() {
  const machineInfo = {
    doctorConsultancy: { count: 10, type: 'Doctor Consultancy', image: 'assets/img/doctor_image.jpeg', link: '/ChatHome' },
    aiDoctor: { count: 5, type: 'AI Doctor', image: 'assets/img/ai_doctor_image.jpeg', link: '/AiIndex' },
    reportsScanner: { count: 3, type: 'Reports Scanner', image: 'assets/img/reports_scanner_image.jpeg', link: '/ScanOptions' }
  };

  return (
    <div className="col-lg-4">
      <div className="row">
        {Object.keys(machineInfo).map((key, index) => (
          <div key={index} className="col-xxl-4 col-xl-12">
            <a href={machineInfo[key].link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card info-card" style={{ backgroundColor: '#ffffe6', marginBottom: '20px' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#e6005c' }}>
                     {machineInfo[key].type} <span>| </span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9cccc', width: '50px', height: '50px' }}>
                      <img src={machineInfo[key].image} alt="Machine Image" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    </div>
                    <div className="ps-3">
                      <h6>{machineInfo[key].count}</h6>
                      <span className="text-muted small pt-2 ps-1">
                        {machineInfo[key].type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCards;

