import React from "react";
import "./About.css"; // Import CSS for styling

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <section className="about-content">
        <p>
          Welcome to <strong>Food Donation App</strong>, a platform dedicated to reducing food waste 
          and feeding those in need. We connect food donors with charities to ensure surplus food reaches 
          the right hands instead of going to waste.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to create a world where no food goes to waste and no person goes hungry.
          Through our app, we enable individuals, restaurants, and organizations to donate surplus food 
          quickly and efficiently.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>💛 Easy and quick food donation process</li>
          <li>🍽️ Helps eliminate food waste and hunger</li>
          <li>🌍 Supports communities and sustainability</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>© 2025 Food Donation App. Making a Difference Together!</p>
      </footer>
    </div>
  );
};

export default AboutUs;