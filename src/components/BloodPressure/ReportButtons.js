// src/ReportButtons.js
import React from 'react';

function ReportButtons() {
  const downloadReport = (period) => {
    window.location.href = `/download_report/${period}`;
  };

  return (
    <div>
      <button onClick={() => downloadReport('weekly')}>Download Weekly Report</button>
      <button onClick={() => downloadReport('monthly')}>Download Monthly Report</button>
    </div>
  );
}

export default ReportButtons;
