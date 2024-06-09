import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function BloodSugarRecord() {
  const [records, setRecords] = useState([]);
  const [bloodSugarLevel, setBloodSugarLevel] = useState('');
  const [date, setDate] = useState('');

  const handleAddRecord = () => {
    const newRecord = { bloodSugarLevel, date };
    setRecords(prevRecords => [...prevRecords, newRecord]);
    setBloodSugarLevel('');
    setDate('');
  };

  const handleDownloadCSV = () => {
    const csvData = records.map(record => `${record.bloodSugarLevel},${record.date}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'blood_sugar_records.csv');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '5px', backgroundColor: '#f8f9fa' , backgroundImage: 'url("assets/img/bgbloodsugar.jpeg")'}}>
      <div style={{ width: '100%', maxWidth: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px', fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>Blood Sugar Records</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Blood Sugar Level:
            <input type="number" value={bloodSugarLevel} onChange={(e) => setBloodSugarLevel(e.target.value)} required style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }} />
          </label>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }} />
          </label>
          <button onClick={handleAddRecord} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}>Add Record</button>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button onClick={handleDownloadCSV} style={{ padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', transition: 'background-color 0.3s' }}>Download as CSV</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Record Details</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Blood Sugar Level</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{record.bloodSugarLevel}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontFamily: 'Arial, sans-serif' }}>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BloodSugarRecord;
