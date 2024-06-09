import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function ChestDiseasePrediction() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [probabilities, setProbabilities] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePrediction = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile); // Ensure the file is correctly appended

    try {
      const response = await axios.post('http://localhost:8000/predict/model1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
      setProbabilities(response.data.probabilities || {});
      setShowWarning(true);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  const probabilityData = {
    labels: Object.keys(probabilities),
    datasets: [{
      label: 'Probability (%)',
      backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
      data: Object.values(probabilities),
    }],
  };

  const chartOptions = {
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Chest X-RAY Disease Prediction</h2>
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
        A chest X-ray is a medical imaging test that uses electromagnetic waves to create pictures of the heart, lungs, bones, and blood vessels of the chest.
        It is often used to diagnose conditions such as pneumonia, lung cancer, and heart failure.
        </p>
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
        Please upload a chest X-ray image below for classification.
        </p>
      </div>
      <input id="upload-photo" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      <label htmlFor="upload-photo" style={{ backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', display: 'inline-block', marginRight: '10px' }}>Upload Photo</label>
      <button onClick={handlePrediction} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', marginLeft: '10px' }}>Predict Tumor Type</button>
      {imagePreview && (
        <div style={{ marginBottom: '20px' }}>
          <img src={imagePreview} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: '5px' }} />
        </div>
      )}
      {showWarning && (
        <p style={{ color: 'red', fontStyle: 'italic', marginBottom: '20px' }}>
          This is an AI prediction. Please consult a medical professional for accurate diagnosis.
        </p>
      )}
      {prediction && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Prediction</h3>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>Tumor Type: <strong>{prediction}</strong></p>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Bar data={probabilityData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChestDiseasePrediction;
