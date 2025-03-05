import React from "react";
import "./home.css";
import logo from "../../assets/Homebanner.jpg"; // Update with the actual path to your image

const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="HungerHeal Logo" className="home-logo" />
      <h1 className="home-title">HungerHeal</h1>
    </div>
  );
};

export default Home;
