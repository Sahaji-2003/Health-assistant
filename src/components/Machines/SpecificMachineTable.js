import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SpecificMachineTable() {
  const { machineId } = useParams();
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=5`);
        setMachineData(response.data);
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    };

    fetchMachineData();
  }, [machineId]);

  return (
    <>
      {/* Recent Sales */}
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">
              Machine Status Of {machineId} <span>| Today</span>
            </h5>

            {/* Display channel information */}
            {machineData && (
              <div className="channel-info">
                <h2>{machineData.channel.name}</h2>
                <p>Machine Id: {machineData.channel.id}</p>
                <p>Description: {machineData.channel.description}</p>
                <p>Location: {machineData.channel.latitude}, {machineData.channel.longitude}</p>
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
                </tr>
              </thead>
              <tbody>
                {machineData && machineData.feeds && machineData.feeds.length > 0 ? (
                  machineData.feeds.map((feed, index) => (
                    <tr key={feed.entry_id}>
                      <td>{index + 1}</td>
                      <td>{new Date(feed.created_at).toLocaleString()}</td>
                      <td>{feed.entry_id}</td>
                      <td>{feed.field1}</td>
                      <td>{feed.field2}</td>
                      <td>{feed.field3}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End Recent Sales */}
    </>
  );
}

export default SpecificMachineTable;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function SpecificMachineTable() {
//   const { machineId } = useParams();
//   const [machineData, setMachineData] = useState(null);

//   useEffect(() => {
//     const fetchMachineData = async () => {
//       try {
//         const response = await axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=5`);
//         setMachineData(response.data);
//       } catch (error) {
//         console.error('Error fetching machine data:', error);
//       }
//     };

//     fetchMachineData();
//   }, [machineId]);

//   return (
//     <div className="col-12">
//       <div className="card recent-sales overflow-auto">
//         <div className="card-body">
//           <h1>Machine Details for ID: {machineId}</h1>
//           {machineData ? (
//             <div>
//               <div className="channel-info">
//                 <h2>{machineData.channel.name}</h2>
//                 <p>{machineData.channel.description}</p>
//                 <p>Location: {machineData.channel.latitude}, {machineData.channel.longitude}</p>
//               </div>
//               <table className="table table-borderless datatable">
//                 <thead>
//                   <tr>
//                     <th>Entry ID</th>
//                     <th>Created At</th>
//                     <th>Field1</th>
//                     <th>Field2</th>
//                     <th>Field3</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {machineData.feeds.map(feed => (
//                     <tr key={feed.entry_id}>
//                       <td>{feed.entry_id}</td>
//                       <td>{new Date(feed.created_at).toLocaleString()}</td>
//                       <td>{feed.field1}</td>
//                       <td>{feed.field2}</td>
//                       <td>{feed.field3}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SpecificMachineTable;

// import React, { useState, useEffect } from 'react';

// function SpecificMachineTable() {
//   const [machinesData, setMachinesData] = useState([]);
//   const [channelInfo, setChannelInfo] = useState(null);


//   useEffect(() => {
//     // Fetch data from the API endpoint
//     fetch('https://api.thingspeak.com/channels/2422147/feeds.json?api_key=E6V6BU2L78L7YYAZ&results=40')
//       .then(response => response.json())
//       .then(data => {
//         setChannelInfo(data.channel);
//         // Assuming 'feeds' contains machine data
//         setMachinesData(data.feeds);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <>
//       {/* Recent Sales */}
//       <div className="col-12">
//         <div className="card recent-sales overflow-auto">
//           {/* Rest of your card content */}

//           <div className="card-body">
//             <h5 className="card-title">
//               All Machines Status <span>| Today</span>
//             </h5>
          
//             {/* Display channel information */}
//       {channelInfo && (
//         <div className="channel-info">
//           <h2>{channelInfo.name}</h2>
//           <p>Machine Id: {channelInfo.id}</p>
//           <p>Description: {channelInfo.description}</p>
//           <p>Location: {channelInfo.latitude}, {channelInfo.longitude}</p>
//         </div>
//       )}
      
//             <table className="table table-borderless datatable">
//               <thead>
//                 <tr>
//                   <th scope="col">Sr No.</th>
//                   <th scope="col">Last Update Time</th>
//                   <th scope="col">Entry ID</th>
//                   <th scope="col">Fuel Level</th>
//                   <th scope="col">Genset ON/OFF</th>
//                   <th scope="col">Sensor Status</th>
//                   {/* <th scope="col">Fuel Capacity</th>
//                   <th scope="col">Status</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Render table rows dynamically using fetched data */}
//                 {machinesData.map((machine, index) => (
//                   <tr key={index}>
//                      {machine.id}
//                     <th scope="row">{index + 1}</th>
//                     <td>{machine.created_at}</td>
//                     {/* Assuming machine ID, location, battery, fuel level, and status are available in the feed */}
//                     <td>{machine.entry_id}</td>
//                     {/* <td>{machine.location}</td>
//                     <td>{machine.battery}</td> */}
//                     <td>{machine.field1}</td>
//                     <td>{machine.field2}</td>
//                     <td>{machine.field3}</td>
//                     {/* Add more fields as needed */}
//                     {/* <td>100%</td> Example data for fuel capacity */}
//                     {/*<td><span className={`badge ${machine.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>{machine.status}</span></td>*/}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* End Recent Sales */}
//     </>
//   );
// }

// export default SpecificMachineTable;
