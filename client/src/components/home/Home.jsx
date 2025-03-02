import React from "react";
import Lottie from "lottie-react";
import "./home.css";
import homeanime from "../../assets/Title Animation.json";
// import video from "../../assets/Food deliver track.mp4";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content-container">
          <div className="hero-content">
            <h1>Donate Food, Share Hope</h1>
            <p>
              Join us in fighting hunger by donating surplus food to those in need.
            </p>
            <div className="hero-buttons">
              <button className="donate-btn">Donate Now</button>
              <button className="request-btn">Request Food</button>
            </div>
          </div>
          <Lottie animationData={homeanime} className="homeanime" />
          {/* <video width="640" height="360" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
        </video> */}
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Our Mission</h2>
        <p>
          We aim to reduce food waste and ensure that surplus food reaches those in need.
          Partner with us to make a difference.
        </p>
      </section>

      {/* Featured Donations Section */}
      <section className="featured">
        <h2>Recent Donations</h2>
        <div className="donation-list">
          <div className="donation-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlYFoIWQR098im9JXHtsHeeUvYQ8AYw64AQQ&s"
              alt="Fresh Fruits & Vegetables"
            />
            <p>Fresh Fruits & Vegetables</p>
          </div>
          <div className="donation-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBEi6idx9U4NjggBHjTuOL9Jwz2fC2QOQQw&s"
              alt="Cooked Meals"
            />
            <p>Cooked Meals</p>
          </div>
          <div className="donation-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtCtrLBE5V9eKHEP_I_Hl3rt4qGWLkevUPOg&s"
              alt="Drinks"
            />
            <p>Drinks</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Be a Part of the Change</h2>
        <button className="join-btn">Join Us</button>
      </section>
    </div>
  );
};

export default Home;
