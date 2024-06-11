import React, { useState } from 'react';

const Fitness = () => {
  const [formData, setFormData] = useState({
    routine: '',
    walkPerDay: '',
    meditate: '',
    sleepHours: '',
    eatingHabits: '',
  });

  const [fitnessScore, setFitnessScore] = useState(null);
  const [statistics, setStatistics] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateFitnessScore(formData);
    setFitnessScore(score);
    const stats = generateStatistics(formData);
    setStatistics(stats);
  };

  const calculateFitnessScore = (data) => {
    let score = 0;
    if (data.routine === 'active') score += 20;
    if (parseInt(data.walkPerDay) >= 30) score += 20;
    if (data.meditate === 'yes') score += 20;
    if (parseInt(data.sleepHours) >= 7) score += 20;
    if (data.eatingHabits === 'healthy') score += 20;
    return score;
  };

  const generateStatistics = (data) => {
    const stats = {
      routine: data.routine === 'active' ? 'Active lifestyle' : 'Sedentary lifestyle',
      walkPerDay: `Walks ${data.walkPerDay} minutes per day`,
      meditate: data.meditate === 'yes' ? 'Meditates regularly' : 'Does not meditate',
      sleepHours: `Sleeps ${data.sleepHours} hours per night`,
      eatingHabits: data.eatingHabits === 'healthy' ? 'Follows healthy eating habits' : 'Needs to improve eating habits',
    };
    return stats;
  };

  return (
    <div style={{
      maxWidth: '700px',
      maxHeight : '600px',
      margin: '0 auto',
      padding: '2px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f8f9fa',
      backgroundImage: 'url("assets/img/aam.jpeg")'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Fitness Master</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Daily Routine:
          <select name="routine" value={formData.routine} onChange={handleChange} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="sedentary">Sedentary</option>
          </select>
        </label>
        <label>
          Minutes Walked Per Day:
          <input type="number" name="walkPerDay" value={formData.walkPerDay} onChange={handleChange} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        </label>
        <label>
          Do You Meditate?
          <select name="meditate" value={formData.meditate} onChange={handleChange} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          Hours of Sleep Per Night:
          <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
        </label>
        <label>
          Eating Habits:
          <select name="eatingHabits" value={formData.eatingHabits} onChange={handleChange} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <option value="">Select</option>
            <option value="healthy">Healthy</option>
            <option value="unhealthy">Unhealthy</option>
          </select>
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Get Fitness Score</button>
      </form>
      {fitnessScore !== null && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Your Fitness Score: <span style={{ fontSize: '2em', color: '#28a745' }}>{fitnessScore}</span></h3>
          <div style={{ marginTop: '10px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
            <h4>Statistics:</h4>
            <p><strong>Daily Routine:</strong> {statistics.routine}</p>
            <p><strong>Walking:</strong> {statistics.walkPerDay}</p>
            <p><strong>Meditation:</strong> {statistics.meditate}</p>
            <p><strong>Sleep:</strong> {statistics.sleepHours}</p>
            <p><strong>Eating Habits:</strong> {statistics.eatingHabits}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fitness;