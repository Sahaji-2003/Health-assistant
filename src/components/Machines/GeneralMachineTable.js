// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../constants/GlobalStateProvider';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function GeneralMachineTable() {
//   const [machinesData1, setMachinesData1] = useState([]);
//   const [machinesData2, setMachinesData2] = useState([]);
//   const [channelInfo1, setChannelInfo1] = useState(null);
//   const [channelInfo2, setChannelInfo2] = useState(null);
//   const [MachineInfo, setMachineInfo] = useState('');
//   const location = useLocation();
//   const { getGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
    
//     if (globalState) {
//       fetchMachineInfo(globalState);
//     }
//   }, [location]); 

//   const fetchMachineInfo = async (globalState) => {
//     try {
//       const response = await axios.get(`https://api-mongo-eta.vercel.app/machines/user/${globalState}`);
//       const data = response.data;

//       if (data.success) {
//         setMachineInfo(data);
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [response1, response2] = await Promise.all([
//           fetch('https://api-mongo-eta.vercel.app/feeds/fetch-last-feeds?id=2422149&results=10'),
//           fetch('https://api-mongo-eta.vercel.app/feeds/fetch-last-feeds?id=2422147&results=10'),
//         ]);

//         const data1 = await response1.json();
//         const data2 = await response2.json();

//         setChannelInfo1(data1.channel);
//         setMachinesData1(data1.feeds || []);
        
//         setChannelInfo2(data2.channel);
//         setMachinesData2(data2.feeds || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderTable = (channelInfo, machinesData) => {
//     if (!channelInfo || !machinesData.length) return null;

//     return (
//       <div className="col-12">
//         <div className="card recent-sales overflow-auto">
//           <div className="card-body">
//             <h5 className="card-title">Machine Status: {channelInfo.name} <span>| Today</span></h5>
//             <table className="table table-borderless datatable">
//               <thead>
//                 <tr>
//                   <th scope="col">Machine ID</th>
//                   <th scope="col">Machine Name</th>
//                   <th scope="col">Last Update Time</th>
//                   <th scope="col">Entry ID</th>
//                   <th scope="col">Fuel Level</th>
//                   <th scope="col">Genset ON/OFF</th>
//                   <th scope="col">Sensor Status</th>
//                   <th scope="col">Location</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {machinesData.map((machine, index) => (
//                   <tr key={index}>
//                     <td>{channelInfo.id}</td>
//                     <td>{channelInfo.name}</td>
//                     <td>{machine.created_at}</td>
//                     <td>{machine.entry_id}</td>
//                     <td>{machine.field1}</td>
//                     <td>{machine.field2}</td>
//                     <td>{machine.field3}</td>
//                     <td>{channelInfo.latitude}, {channelInfo.longitude}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       {renderTable(channelInfo1, machinesData1)}
//       {renderTable(channelInfo2, machinesData2)}
//     </>
//   );
// }

// export default GeneralMachineTable;


// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../constants/GlobalStateProvider';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function GeneralMachineTable() {
//   const [machinesData, setMachinesData] = useState([]);
//   const [channelInfo, setChannelInfo] = useState([]);
  

//   const [MachineInfo, setMachineInfo] = useState('');
//   const location = useLocation();
//   const [user_id, setUserId] = useState('');
//   const { getGlobal, setGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (globalState) {
//       fetchMachineInfo(globalState);
//       // setGlobalUserId(user_id);
//     }
//     // else{
//     //   setUserId(getGlobalUserId());
//     // }
//   }, [location]); // Include 'user_id' in the dependency array
//   const fetchMachineInfo = async (globalState) => {
//     try {
//       const response = await axios.get(`https://api-mongo-eta.vercel.app/machines/user/${globalState}`);
//       const data = response.data;

//       console.log('User Info:', data); // Log user data received from the server

//       if (data.success) {
//         setMachineInfo(data);
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   useEffect(() => {
//     // Array of API endpoints
//     const apiEndpoints = [
//       'https://api.thingspeak.com/channels/2422147/feeds.json?api_key=E6V6BU2L78L7YYAZ&results=40',
//       'https://api.thingspeak.com/channels/2422119/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=10',
//       // 'https://api-mongo-eta.vercel.app/feeds/fetch-last-feeds?id=2422149&results=10',
//       // Add more API endpoints as needed
//     ];

//     // Fetch data from each API endpoint
//     Promise.all(apiEndpoints.map(endpoint => fetch(endpoint)))
//       .then(responses => Promise.all(responses.map(response => response.json())))
//       .then(dataArray => {
//         const channels = dataArray.map(data => data.channel);
//         const feeds = dataArray.map(data => data.feeds[0]); // Getting the last entry

//         setChannelInfo(channels);
//         setMachinesData(feeds);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <>
//       <div className="col-12">
//         <div className="card recent-sales overflow-auto">
//           <div className="card-body">
//             <h5 className="card-title">All Machines Status {MachineInfo.machine_ids}<span>| {MachineInfo.machine_count}</span></h5>

//             {/* Display channel information */}
//             {channelInfo.map((channel, index) => (
//               <div className="channel-info" key={index}>
//                 {/* <h2>{channel.name}</h2> */}
//                 {/* <p>Machine Id: {channel.id}</p>
//                 <p>Description: {channel.description}</p>
//                 <p>Location: {channel.latitude}, {channel.longitude}</p> */}
//               </div>
//             ))}

//             <table className="table table-borderless datatable">
//               <thead>
//                 <tr>
//                 <th scope="col">Machine ID</th>
//                   <th scope="col">Machine Name</th>
//                   <th scope="col">Last Update Time</th>
//                   <th scope="col">Entry ID</th>
//                   <th scope="col">Fuel Level</th>
//                   <th scope="col">Genset ON/OFF</th>
//                   <th scope="col">Sensor Status</th>
//                   <th scope="col">Location</th>
//                   {/* Add more table headers as needed */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Render table rows dynamically using fetched data */}
//                 {machinesData.map((machine, index) => (
//                   <tr key={index}>
//                     <td>{channelInfo[index].id}</td>
//                     <td>{channelInfo[index].name}</td>
//                     <td>{machine.created_at}</td>
//                     <td>{machine.entry_id}</td>
//                     <td>{machine.field1}</td>
//                     <td>{machine.field2}</td>
//                     <td>{machine.field3}</td>
//                     <td>{channelInfo[index].latitude}, {channelInfo[index].longitude}</td>

//                     {/* Add more fields as needed */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default GeneralMachineTable;

// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../constants/GlobalStateProvider';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { API_URL } from '../constants/Url';

// function GeneralMachineTable() {
//   const [machinesData, setMachinesData] = useState([]);
//   const [channelInfo, setChannelInfo] = useState([]);
//   const [machineIds, setMachineIds] = useState([]);
//   const [machineCount, setMachineCount] = useState(0);
//   const location = useLocation();
//   const { getGlobal, setGlobal } = useGlobalState();
//   const globalState = getGlobal();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (globalState) {
//       fetchMachineInfo(globalState);
//     }
//   }, [location]);

//   const fetchMachineInfo = async (globalState) => {
//     try {
//       const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
//       const data = response.data;

//       if (data.success) {
//         setMachineIds(data.machine_ids);
//         setMachineCount(data.machine_count);
//       }
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//     }
//   };

//   // useEffect(() => {
//   //   if (machineIds.length > 0) {
//   //     const apiPromises = machineIds.map(machineId =>
//   //       fetch(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=1`)
//   //         .then(response => response.json())
//   //         .catch(error => {
//   //           console.error(`Error fetching data for machine ID ${machineId}:`, error);
//   //           return null;
//   //         })
//   //     );

//   //     Promise.all(apiPromises)
//   //       .then(dataArray => {
//   //         const channels = dataArray.map(data => data.channel);
//   //         const feeds = dataArray.map(data => data.feeds[0]); // Getting the first entry

//   //         setChannelInfo(channels);
//   //         setMachinesData(feeds);
//   //       })
//   //       .catch(error => console.error('Error fetching data:', error));
//   //   }
//   // }, [machineIds]);

//   useEffect(() => {
//     if (machineIds.length > 0) {
//       const fetchData = async () => {
//         try {
//           const apiPromises = machineIds.map(machineId =>
//             axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=1`)
//           );

//           const results = await axios.all(apiPromises);
//           const dataArray = results.map(result => result.data);

//           const channels = dataArray.map(data => data.channel);
//           const feeds = dataArray.map(data => data.feeds[0]); // Getting the first entry

//           setChannelInfo(channels);
//           setMachinesData(feeds);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };

//       fetchData();
//     }

//     // const fetchData = async () => {
//     //   try {
//     //     const channels = [];
//     //     const feeds = [];
    
//     //     for (const machineId of machineIds) {
//     //       const response = await axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=1`);
//     //       const data = response.data;
    
//     //       channels.push(data.channel);
//     //       feeds.push(data.feeds[0]);
//     //     }
    
//     //     setChannelInfo(channels);
//     //     setMachinesData(feeds);
//     //   } catch (error) {
//     //     console.error('Error fetching data:', error);
//     //   }
//     // };
    
//     // fetchData();
    
//   }, [machineIds]);

 

//   return (
//     <>
//       <div className="col-12">
//         <div className="card recent-sales overflow-auto">
//           <div className="card-body">
//             <h5 className="card-title">All Machines Status {machineIds} <span>| {machineCount}</span></h5>

//             <table className="table table-borderless datatable">
//               <thead>
//                 <tr>
//                   <th scope="col">Machine ID</th>
//                   <th scope="col">Machine Name</th>
//                   <th scope="col">Last Update Time</th>
//                   {/* <th scope="col">Entry ID</th> */}
//                   <th scope="col">Fuel Level</th>
//                   <th scope="col">ON/OFF</th>
//                   {/* <th scope="col">Sensor Status</th> */}
//                   <th scope="col">Location</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {machinesData.map((machine, index) => (
//                   <tr key={index}>
//                     <td>{channelInfo[index]?.id}</td>
//                     <td>{channelInfo[index]?.name}</td>
//                     <td>{new Date(machine?.created_at).toLocaleString()}</td>
//                     {/* <td>{machine?.entry_id}</td> */}
//                     <td>{machine?.field1}</td>
//                     <td>{machine?.field2 === "1" ? "On" : "Off"}</td>
//                     {/* <td>{machine?.field3}</td> */}
//                     <td>{channelInfo[index]?.latitude}, {channelInfo[index]?.longitude}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default GeneralMachineTable;



import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Url';
import { FaBatteryFull, FaBatteryHalf, FaBatteryQuarter, FaBatteryThreeQuarters, FaBatteryEmpty, FaMapMarkerAlt } from 'react-icons/fa';

const CACHE_TIMEOUT = 30 * 1000; // 30 seconds

function GeneralMachineTable() {
  const [machinesData, setMachinesData] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);
  const [machineIds, setMachineIds] = useState([]);
  const [fuelPercentages, setFuelPercentages] = useState({});
  const [fuelCapacities, setFuelCapacities] = useState({});
  const location = useLocation();
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  const defaultApiKey = 'YR2MHT97ZBXYIL4Y';
  const specificApiKey = 'E6V6BU2L78L7YYAZ';
  const specificMachineId = '2422147';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (globalState) {
      fetchMachineInfo(globalState);
    }
  }, [location, globalState]);

  const fetchMachineInfo = async (globalState) => {
    try {
      const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
      const data = response.data;

      if (data.success) {
        setMachineIds(data.machine_ids);

        const capacities = data.fuel_capacities.reduce((acc, { machine_id, fuel_capacity }) => {
          acc[machine_id] = fuel_capacity;
          return acc;
        }, {});
        setFuelCapacities(capacities);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    if (machineIds.length > 0) {
      fetchData(machineIds);
    }
  }, [machineIds]);

  const fetchData = async (machineIds) => {
    const cachedData = JSON.parse(localStorage.getItem('machineData')) || {};
    const lastFetchTime = cachedData.timestamp || 0;

    if (Date.now() - lastFetchTime < CACHE_TIMEOUT) {
      setChannelInfo(cachedData.channels);
      setMachinesData(cachedData.feeds);
      calculateFuelPercentages(cachedData.feeds, fuelCapacities);
      return;
    }

    let timeoutReached = false;
    const timeout = setTimeout(() => {
      timeoutReached = true;
      setChannelInfo(cachedData.channels);
      setMachinesData(cachedData.feeds);
      calculateFuelPercentages(cachedData.feeds, fuelCapacities);
    }, CACHE_TIMEOUT);

    try {
      const apiPromises = machineIds.map(machineId => {
        const apiKey = machineId === specificMachineId ? specificApiKey : defaultApiKey;
        return axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=${apiKey}&results=1`);
      });

      const results = await axios.all(apiPromises);
      clearTimeout(timeout);

      if (!timeoutReached) {
        const dataArray = results.map(result => result.data);
        const channels = dataArray.map(data => data.channel);
        const feeds = dataArray.map(data => data.feeds[0] || {}); // Handling case where feeds might be empty

        const newData = {
          timestamp: Date.now(),
          channels,
          feeds,
        };

        localStorage.setItem('machineData', JSON.stringify(newData));

        setChannelInfo(channels);
        setMachinesData(feeds);
        calculateFuelPercentages(feeds, fuelCapacities);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateFuelPercentages = (machinesData, fuelCapacities) => {
    const percentages = {};
    machinesData.forEach((machine) => {
      const machineId = machine.channel_id;
      const fuelCapacity = fuelCapacities[machineId];
      if (fuelCapacity !== null && machine.field1 !== undefined) {
        const fuelPercentage = (parseFloat(machine.field1) / fuelCapacity) * 100;
        percentages[machineId] = fuelPercentage.toFixed(2);
      } else {
        percentages[machineId] = 'NA';
      }
    });
    setFuelPercentages(percentages);
  };

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Machines Status : {machineIds.join(', ')}</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">Machine ID</th>
                <th scope="col">Machine Name</th>
                <th scope="col">Last Update Time</th>
                <th scope="col">Fuel Level</th>
                <th scope="col">Fuel Percentage</th>
                <th scope="col">Genset</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              {machinesData.map((machine, index) => {
                const fuelCapacity = fuelCapacities[channelInfo[index]?.id];
                const fuelLevel = parseFloat(machine.field1);
                const fuelPercentage = fuelCapacity && fuelLevel > 0 && fuelLevel <= fuelCapacity 
                  ? (fuelLevel / fuelCapacity) * 100 
                  : null;
                
                let fuelIcon;
                let fuelColor;
                if (fuelPercentage === null) {
                  fuelIcon = <FaBatteryEmpty />;
                  fuelColor = 'gray';
                } else if (fuelPercentage > 75) {
                  fuelIcon = <FaBatteryFull />;
                  fuelColor = 'green';
                } else if (fuelPercentage > 50) {
                  fuelIcon = <FaBatteryThreeQuarters />;
                  fuelColor = 'limegreen';
                } else if (fuelPercentage > 25) {
                  fuelIcon = <FaBatteryHalf />;
                  fuelColor = 'orange';
                } else {
                  fuelIcon = <FaBatteryQuarter />;
                  fuelColor = 'red';
                }

                return (
                  <tr key={index}>
                    <td>{channelInfo[index]?.id || 'N/A'}</td>
                    <td>{channelInfo[index]?.name || 'N/A'}</td>
                    <td>{machine.created_at ? new Date(machine.created_at).toLocaleString() : 'N/A'}</td>
                    <td>{machine.field1 || 'N/A'}</td>
                    <td>
                      {fuelPercentage !== null 
                        ? <span className="battery-icon" style={{ color: fuelColor }}>
                            {fuelIcon} <b><span className="battery-text">{fuelPercentage.toFixed(2)}%</span></b>
                          </span>
                        : 'NA'}
                    </td>
                    <td>
                      <button className={`btn ${machine.field2 === "1" ? 'btn-success':'btn-danger' }`}>
                        {machine.field2 === "1" ? "On" : "Off"}
                      </button>
                    </td>
                    <td>
                      {channelInfo[index]?.latitude}, {channelInfo[index]?.longitude || 'N/A'} 
                      <FaMapMarkerAlt />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GeneralMachineTable;
