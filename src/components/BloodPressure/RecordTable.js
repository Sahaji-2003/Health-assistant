// src/RecordsTable.js
import React from 'react';

function RecordTable({ records }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Systolic</th>
          <th>Diastolic</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.systolic}</td>
            <td>{record.diastolic}</td>
            <td>{record.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecordTable;
