// import React from 'react'

// function Table_totalmachines() {
//   return (
//     <>
//   {/* Recent Sales */}
//   <div className="col-12">
//     <div className="card recent-sales overflow-auto">
//       <div className="filter">
//         <a className="icon" href="#" data-bs-toggle="dropdown">
//           <i className="bi bi-three-dots" />
//         </a>
//         <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//           <li className="dropdown-header text-start">
//             <h6>Filter</h6>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               Today
//             </a>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               This Month
//             </a>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               This Year
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="card-body">
//         <h5 className="card-title">
//           All Machines Status <span>| Today</span>
//         </h5>
//         <table className="table table-borderless datatable">
//           <thead>
//             <tr>
//               <th scope="col">Sr No.</th>
//               <th scope="col">Last Update Time</th>
//               <th scope="col">Machine ID</th>
//               <th scope="col">Location</th>
//               <th scope="col">Battery (%)</th>
//               <th scope="col">Fuel Level</th>
//               <th scope="col">Fuel Capacity</th>
//               <th scope="col">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Dummy Data */}
//             <tr>
//               <th scope="row">1</th>
//               <td>2024-03-23 09:35:21</td>
//               <td>123456</td>
//               <td>New York</td>
//               <td>80%</td>
//               <td>70%</td>
//               <td>100%</td>
//               <td><span className="badge bg-success">Active</span></td>
//             </tr>
//             <tr>
//               <th scope="row">2</th>
//               <td>2024-03-23 10:45:32</td>
//               <td>789012</td>
//               <td>Los Angeles</td>
//               <td>90%</td>
//               <td>60%</td>
//               <td>80%</td>
//               <td><span className="badge bg-warning">Inactive</span></td>
//             </tr>
//             <tr>
//               <th scope="row">3</th>
//               <td>2024-03-23 11:55:43</td>
//               <td>456789</td>
//               <td>Chicago</td>
//               <td>75%</td>
//               <td>80%</td>
//               <td>90%</td>
//               <td><span className="badge bg-success">Active</span></td>
//             </tr>
//             <tr>
//               <th scope="row">4</th>
//               <td>2024-03-23 12:05:54</td>
//               <td>234567</td>
//               <td>Houston</td>
//               <td>85%</td>
//               <td>50%</td>
//               <td>70%</td>
//               <td><span className="badge bg-success">Active</span></td>
//             </tr>
//             <tr>
//               <th scope="row">5</th>
//               <td>2024-03-23 13:15:05</td>
//               <td>890123</td>
//               <td>Miami</td>
//               <td>70%</td>
//               <td>90%</td>
//               <td>95%</td>
//               <td><span className="badge bg-success">Active</span></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   {/* End Recent Sales */}
// </>
//   )
// }

// export default Table_totalmachines

import React, { useState, useEffect } from 'react';

function Table_totalmachines() {
  const [machinesData, setMachinesData] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);


  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://api.thingspeak.com/channels/2422119/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=20')
      .then(response => response.json())
      .then(data => {
        setChannelInfo(data.channel);
        // Assuming 'feeds' contains machine data
        setMachinesData(data.feeds);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      {/* Recent Sales */}
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          {/* Rest of your card content */}

          <div className="card-body">
            <h5 className="card-title">
              All Machines Status <span>| Today</span>
            </h5>
          
            {/* Display channel information */}
      {channelInfo && (
        <div className="channel-info">
          <h2>{channelInfo.name}</h2>
          <p>Machine Id: {channelInfo.id}</p>
          <p>Description: {channelInfo.description}</p>
          <p>Location: {channelInfo.latitude}, {channelInfo.longitude}</p>
        </div>
      )}
      
            <table className="table table-borderless datatable">
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Last Update Time</th>
                  <th scope="col">Entry ID</th>
                  <th scope="col">Fuel Level</th>
                  <th scope="col">Genset ON/OFF</th>
                  <th scope="col">Sensor Status</th>
                  {/* <th scope="col">Fuel Capacity</th>
                  <th scope="col">Status</th> */}
                </tr>
              </thead>
              <tbody>
                {/* Render table rows dynamically using fetched data */}
                {machinesData.map((machine, index) => (
                  <tr key={index}>
                     {machine.id}
                    <th scope="row">{index + 1}</th>
                    <td>{machine.created_at}</td>
                    {/* Assuming machine ID, location, battery, fuel level, and status are available in the feed */}
                    <td>{machine.entry_id}</td>
                    {/* <td>{machine.location}</td>
                    <td>{machine.battery}</td> */}
                    <td>{machine.field1}</td>
                    <td>{machine.field2}</td>
                    <td>{machine.field3}</td>
                    {/* Add more fields as needed */}
                    {/* <td>100%</td> Example data for fuel capacity */}
                    {/*<td><span className={`badge ${machine.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>{machine.status}</span></td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End Recent Sales */}
    </>
  );
}

export default Table_totalmachines;

