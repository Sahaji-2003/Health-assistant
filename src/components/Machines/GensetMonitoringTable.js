import React, { useEffect, useState } from 'react';

const GensetMonitoringTable = () => {
  const [data, setData] = useState([]);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    // Replace with the actual API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-mongo-eta.vercel.app/feeds/fetch-last-feeds?id=2422149&results=10`);
        const result = await response.json();
        setData(result[0].feeds);
        setChannel(result[0].channel);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{channel.name}</h1>
      <p>{channel.description}</p>
      <table border="1">
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Created At</th>
            <th>Fuel Level</th>
            <th>Genset On/Off</th>
            <th>Sensor Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.entry_id}>
              <td>{entry.entry_id}</td>
              <td>{new Date(entry.created_at).toLocaleString()}</td>
              <td>{entry.field1}</td>
              <td>{entry.field2 === "1" ? "On" : "Off"}</td>
              <td>{entry.field3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GensetMonitoringTable;
