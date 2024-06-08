import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { API_URL } from '../constants/Url';

const GenerateReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);
  const [machineId, setMachineId] = useState('');
  const [machines, setMachines] = useState([]);
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(`${API_URL}/machines/user/${globalState}`);
        setMachines(response.data.machine_ids);
      } catch (err) {
        console.error('Failed to fetch machines', err);
      }
    };

    fetchMachines();
  }, [globalState]);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await axios.get(`${API_URL}/generate/generate_report`, {
        params: { user_id: globalState, days, machine_id: machineId }
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const csvData = data.map(item => ({
      'Machine ID': item.machine_id,
      'Created At': item.created_at,
      'Fuel Level': item.field1,
      'Genset ON/OFF': item.field2,
      'Sensor Status': item.field3,
    }));

    const csvContent = 'data:text/csv;charset=utf-8,' + [
      Object.keys(csvData[0]).join(','), // header row
      ...csvData.map(row => Object.values(row).join(',')), // data rows
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '5px', backgroundColor: '#f8f9fa' }}>
      <div style={{ width: '100%', maxWidth: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px', fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>Generate Report</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Select Machine ID:
            <select value={machineId} onChange={e => setMachineId(e.target.value)} style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}>
              <option value=''>All Machines</option>
              {machines.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Select Days:
            <select value={days} onChange={e => setDays(e.target.value)} style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}>
              {[...Array(7).keys()].map(day => (
                <option key={day + 1} value={day + 1}>{day + 1}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button onClick={handleGenerateReport} style={{ padding: '12px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', transition: 'background-color 0.3s' }}>
            Generate Report
          </button>
        </div>
        {loading && <div style={{ marginTop: '20px', textAlign: 'center' }}>Loading...</div>}
        {error && <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>Error: {error.message}</div>}
        {data.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleDownloadCSV} style={{ display: 'block', margin: '0 auto 20px', padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', transition: 'background-color 0.3s' }}>
              Download CSV
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Machine ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Created At</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Fuel Level</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Genset ON/OFF</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sensor Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{item.machine_id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{item.created_at}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{item.field1}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{item.field2}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{item.field3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReport;
