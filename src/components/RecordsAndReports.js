import React from 'react';

function RecordsAndReports() {
  const dataCards = {
    bloodPressure: {
      link: '/BpRecord',
      backgroundImage: 'url("assets/img/bpimg.jpg")'
    },
    bloodSugar: {
      link: '/BloodSugarRecord',
      backgroundImage: 'url("assets/img/bloodsugar.jpg")'
    },
    weightBMI: {
      link: '/WeightAndBmi',
      backgroundImage: 'url("assets/img/bmiweight.png")'
    }
  };

  const cardStyle = (backgroundImage) => ({
    backgroundColor: '#f8f9fa',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    marginBottom: '20px',
    cursor: 'pointer',
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '20px'
  });

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  };

  const cardContainerStyle = {
    marginBottom: '30px'
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Records and Reports</h2>
      <p className="text-center">Click on data cards for report</p>
      <div className="row justify-content-center">
        {Object.keys(dataCards).map((key, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12" style={cardContainerStyle}>
            <a href={dataCards[key].link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                className="card info-card" 
                style={cardStyle(dataCards[key].backgroundImage)} 
                onMouseEnter={(e) => { Object.assign(e.currentTarget.style, cardHoverStyle); }} 
                onMouseLeave={(e) => { Object.assign(e.currentTarget.style, cardStyle(dataCards[key].backgroundImage)); }}
              >
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'white' }}>{key !== 'weightBMI' && dataCards[key].type} <span>|</span></h5>
                  {key !== 'weightBMI' &&
                  <div className="d-flex align-items-center">
                    <div className="ps-3">
                      <h6>{dataCards[key].count}</h6>
                      <span className="text-muted small pt-2 ps-1" style={{ color: 'white' }}>{dataCards[key].type}</span>
                    </div>
                  </div>
                  }
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordsAndReports;
