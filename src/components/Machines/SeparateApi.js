import React, { useState, useEffect } from 'react';

function SeparateApi() {
  const [machinesData, setMachinesData] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);


  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://api.thingspeak.com/channels/2422147/feeds.json?api_key=E6V6BU2L78L7YYAZ&results=40')
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

export default SeparateApi;
