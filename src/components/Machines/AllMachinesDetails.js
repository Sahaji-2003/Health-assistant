import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Url';

function AllMachinesDetails() {
  const [machinesData, setMachinesData] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);
  const [machineIds, setMachineIds] = useState([]);
  const [machineCount, setMachineCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { getGlobal, setGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
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
        setMachineCount(data.machine_count);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // useEffect(() => {
  //   if (machineIds.length > 0) {
  //     const apiPromises = machineIds.map(machineId =>
  //       fetch(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=5`)
  //         .then(response => response.json())
  //         .catch(error => {
  //           console.error(`Error fetching data for machine ID ${machineId}:`, error);
  //           return null;
  //         })
  //     );

  //     Promise.all(apiPromises)
  //       .then(dataArray => {
  //         const channels = dataArray.map(data => data.channel);
  //         const feeds = dataArray.map(data => data.feeds[0]); // Getting the first entry

  //         setChannelInfo(channels);
  //         setMachinesData(feeds);
  //       })
  //       .catch(error => console.error('Error fetching data:', error));
  //   }
  // }, [machineIds]);

  // const handleRowClick = (machineId) => {
  //   navigate(`/machine/${machineId}`);
  // };

  useEffect(() => {
    if (machineIds.length > 0) {
      const fetchData = async () => {
        try {
          const apiPromises = machineIds.map(machineId =>
            axios.get(`https://api.thingspeak.com/channels/${machineId}/feeds.json?api_key=YR2MHT97ZBXYIL4Y&results=1`)
          );

          const results = await axios.all(apiPromises);
          const dataArray = results.map(result => result.data);

          const channels = dataArray.map(data => data.channel);
          const feeds = dataArray.map(data => data.feeds[0]); // Getting the first entry

          setChannelInfo(channels);
          setMachinesData(feeds);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [machineIds]);

  const handleRowClick = (machineId) => {
    navigate(`/machine/${machineId}`);
  };

  return (
    <>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">All Machines Status <span>| {machineCount}</span></h5>

            <table className="table table-borderless datatable">
              <thead>
                <tr>
                  <th scope="col">Machine ID</th>
                  <th scope="col">Machine Name</th>
                  <th scope="col">Last Update Time</th>
                  <th scope="col">Entry ID</th>
                  <th scope="col">Fuel Level</th>
                  <th scope="col">Genset ON/OFF</th>
                  <th scope="col">Sensor Status</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                {machinesData.map((machine, index) => (
                  <tr key={index} onClick={() => handleRowClick(channelInfo[index]?.id)} style={{ cursor: 'pointer' }}>
                    <td>{channelInfo[index]?.id}</td>
                    <td>{channelInfo[index]?.name}</td>
                    <td>{new Date(machine?.created_at).toLocaleString()}</td>
                    <td>{machine?.entry_id}</td>
                    <td>{machine?.field1}</td>
                    <td>{machine?.field2 === "1" ? "On" : "Off"}</td>
                    <td>{machine?.field3}</td>
                    <td>{channelInfo[index]?.latitude}, {channelInfo[index]?.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllMachinesDetails;
