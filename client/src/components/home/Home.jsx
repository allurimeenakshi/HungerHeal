import React from "react";
import "./home.css";
import logo from "../../assets/Homebanner.png";



const Home = () => {
  return (
    <div className="home-container">
      {/* Image on the left for larger screens */}
      <div className="image-container">
        <img src={logo} alt="HungerHeal Logo" className="home-logo" />
      </div>

      {/* Text on the right */}
      <div className="content-container">
        {/* Title with animation */}
        <h1 className="home-title">
          {"HungerHeal".split("").map((letter, index) => (
            <span key={index} className="letter">{letter}</span>
          ))}
        </h1>

        {/* Quote Below the Title */}
        <p className="home-quote">"No one should go to bed hungry. Together, we can make a difference."</p>

        {/* Buttons Below the Quote */}
        <div className="button-group">
          <button className="donate-btn">Donate Food</button>
          <button className="request-btn">Request Meal</button>
        </div>
      </div>
    </div>
  );
};

export default Home;