import React, { useState } from 'react';
import './Auth.css';
import Login from '../login/Login';
import Register from './Register';
import animationData from "../../assets/animations/auth_animation.json";
import Lottie from "react-lottie";

function Auth() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleRegistrationSuccess = () => {
    setActiveTab('login');
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-animation">
        <Lottie options={defaultOptions} height={290} width={450} />
      </div>

      <div className="auth-form-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Register
          </button>
        </div>

        <div className="auth-forms">
          {activeTab === 'login' ? (
            <Login />
          ) : (
            <Register onRegisterSuccess={handleRegistrationSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
