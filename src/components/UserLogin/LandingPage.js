import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { API_URL } from '../constants/Url';

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5',  backgroundImage: 'url("assets/img/bgland.jpg")' }}>
            
            {/* <img src="assets/img/carelogo.png" alt="Care Logo" width="400" height="250" /> */}
            <h1 style={{ color: '#007bff', marginTop: '320px', marginBottom: '50px' }}>Welcome to Health Assistant</h1>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '300px', margin: '0 auto' }}>
                <div className="landing-button" onClick={navigateToSignUp} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FaUserPlus style={{ fontSize: '50px', color: '#ff69b4' }} />
                    <p style={{ marginTop: '10px' }}>Sign Up</p>
                </div>
                <div className="landing-button" onClick={navigateToLogin} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FaSignInAlt style={{ fontSize: '50px', color: '#007bff' }} />
                    <p style={{ marginTop: '10px' }}>Login</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
