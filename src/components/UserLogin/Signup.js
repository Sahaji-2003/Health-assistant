// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         age: '',
//         gender: '',
//         height: '',
//         weight: '',
//         email: '',
//         password: ''
//     });

//     const { fullName, age, gender, height, weight, email, password } = formData;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
//             console.log(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="fullName" value={fullName} onChange={handleChange} placeholder="Full Name" required />
//             <input type="number" name="age" value={age} onChange={handleChange} placeholder="Age" required />
//             <input type="text" name="gender" value={gender} onChange={handleChange} placeholder="Gender" required />
//             <input type="number" name="height" value={height} onChange={handleChange} placeholder="Height (cm)" required />
//             <input type="number" name="weight" value={weight} onChange={handleChange} placeholder="Weight (kg)" required />
//             <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { API_URL } from '../constants/Url';
const Signup = () => {
      const navigate = useNavigate();
  const { getGlobal, setGlobal } = useGlobalState();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        user_id: '',
        password: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { fullName, age, gender, height, weight, user_id, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/auth/signup`, formData);
            setSuccessMessage('Sign up successful! Redirecting to login page...');
            setTimeout(() => {
                // Redirect to login page after 2 seconds
                //  setGlobalUserId({user_id});
        setGlobal(user_id);
        navigate('/login');
                // window.location.href = '/login';
            }, 2000);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to sign up. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h2>
            {successMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#d4edda', color: '#155724' }}>{successMessage}</div>}
            {errorMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name="fullName" value={fullName} onChange={handleChange} placeholder="Full Name" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="number" name="age" value={age} onChange={handleChange} placeholder="Age" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="text" name="gender" value={gender} onChange={handleChange} placeholder="Gender" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="number" name="height" value={height} onChange={handleChange} placeholder="Height (cm)" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="number" name="weight" value={weight} onChange={handleChange} placeholder="Weight (kg)" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="email" name="user_id" value={user_id} onChange={handleChange} placeholder="Email" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
