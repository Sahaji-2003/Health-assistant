import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function HealthDashboard() {
  const [userInfo, setUserInfo] = useState({
    weight: '',
    height: '',
    age: '',
    activityLevel: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bmi = userInfo.weight && userInfo.height ? (userInfo.weight / ((userInfo.height / 100) ** 2)).toFixed(2) : '';

  const weightData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Weight',
        data: [65, 62, 60, 58, 57, 55, 54],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 7
      },
    ],
  };

  const dietData = {
    labels: ['Carbs', 'Proteins', 'Fats'],
    datasets: [
      {
        label: 'Diet Composition',
        data: [50, 30, 20],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
        borderWidth: 1,
      },
    ],
  };

  const activityData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Steps',
        data: [12000, 15000, 8000, 14000, 17000, 20000, 22000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    border: '1px solid #eee',
    textAlign: 'center'
  };

  const cardTitleStyle = {
    color: '#4a4a4a',
    marginBottom: '10px',
    fontSize: '18px'
  };

  const cardIconStyle = {
    backgroundColor: '#f1f1f1',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px auto'
  };

  const mainContainerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  };

  const sectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const listItemStyle = {
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px'
  };

  const graphContainerStyle = {
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    backgroundColor: '#fff',
    flex: '0 0 48%'
  };

  return (
    <div style={mainContainerStyle}>
      <header style={headerStyle}>
        <h1>Health Assistant Dashboard</h1>
        <p>Welcome back, [User Name]</p>
      </header>

      <section style={{ ...sectionStyle, flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ ...cardStyle, width: '100%', maxWidth: '800px' }}>
          <h2 style={cardTitleStyle}>Enter Your Information</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>Weight (kg): </label>
            <input type="number" name="weight" value={userInfo.weight} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Height (cm): </label>
            <input type="number" name="height" value={userInfo.height} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Age: </label>
            <input type="number" name="age" value={userInfo.age} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Activity Level: </label>
            <select name="activityLevel" value={userInfo.activityLevel} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="very active">Very Active</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </section>

      {submitted && (
        <>
          <section style={sectionStyle}>
            <div style={{ ...cardStyle, width: '48%' }}>
              <h2 style={cardTitleStyle}>Your BMI</h2>
              <p>{bmi}</p>
            </div>
            <div style={{ ...cardStyle, width: '48%' }}>
              <h2 style={cardTitleStyle}>Activity Level</h2>
              <p>{userInfo.activityLevel}</p>
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={graphContainerStyle}>
              <h2 style={cardTitleStyle}>Weight Progress</h2>
              <Line data={weightData} />
            </div>

            <div style={graphContainerStyle}>
              <h2 style={cardTitleStyle}>Diet Composition</h2>
              <Pie data={dietData} />
            </div>
          </section>

          <section style={sectionStyle}>
            <div style={graphContainerStyle}>
              <h2 style={cardTitleStyle}>Weekly Activity</h2>
              <Bar data={activityData} />
            </div>
          </section>

          <section style={{ ...sectionStyle, flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ ...cardStyle, width: '100%', maxWidth: '800px' }}>
              <h2 style={cardTitleStyle}>Personalized Insights</h2>
              <ul>
                <li style={listItemStyle}>Maintain a balanced diet to keep your BMI in check.</li>
                <li style={listItemStyle}>Engage in at least 30 minutes of physical activity daily.</li>
                <li style={listItemStyle}>Track your weight regularly to monitor progress.</li>
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default HealthDashboard;
