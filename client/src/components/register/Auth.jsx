import { useState } from "react";
import Lottie from "lottie-react"; // Import Lottie
import "./Auth.css";
import Login from "../login/Login";
import Register from "./Register";
import animationData from "../../assets/login-animation.json"; // Import animation JSON
import "./Register.css";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleRegistrationSuccess = () => {
    setActiveTab("login");
  };

  return (
    <div className="auth-wrapper">
      {/* Left Side Animation */}
      <div className="auth-left-panel">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Right Side - Login/Register Form */}
      <div className="auth-form-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabSwitch("register")}
          >
            Register
          </button>
        </div>

        <div className="auth-forms">
          {activeTab === "login" ? (
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