import React, { useState } from 'react';
import ReportButtons from './ReportButtons';
import RecordTable from './RecordTable';
import { saveAs } from 'file-saver';

function BpRecord() {
  const [records, setRecords] = useState([]);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [date, setDate] = useState('');

  const handleAddRecord = () => {
    const newRecord = { systolic, diastolic, date };
    setRecords(prevRecords => [...prevRecords, newRecord]);
    setSystolic('');
    setDiastolic('');
    setDate('');
  };

  const handleDownloadCSV = () => {
    const csvData = records.map(record => `${record.systolic},${record.diastolic},${record.date}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'blood_pressure_records.csv');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '5px', backgroundImage: 'url("assets/img/bgbpimg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f8f9fa' }}>
      <div style={{ width: '100%', maxWidth: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px', fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>Blood Pressure Records</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Systolic:
            <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} required style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }} />
          </label>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Diastolic:
            <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} required style={{ marginLeft: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }} />
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
        <RecordTable records={records} />
        {/* <ReportButtons/> */}
      </div>
    </div>
  );
}

export default BpRecord;
