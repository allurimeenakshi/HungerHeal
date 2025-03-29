//import React from "react";
import "./Home.css";
import logo from "../../assets/Homebanner.png";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  // Function to scroll to About Section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Home Section */}
      <div className="home-container">
        <div className="image-container">
          <img src={logo} alt="HungerHeal Logo" className="home-logo" />
        </div>

        <div className="content-container">
          <h1 className="home-title">
            {"HungerHeal".split("").map((letter, index) => (
              <span key={index} className="letter">{letter}</span>
            ))}
          </h1>
          <p className="home-quote">
            No one should go to bed hungry. Together, we can make a difference.
          </p>

          {/* Know More Button */}
          <button className="know-more-btn" onClick={scrollToAbout}>
            Know More!
          </button>

          <div className="button-group">
            <button className="donate-btn">
              <Link to="donate-food">Donate Food</Link>
            </button>
            <button className="request-btn">
              <Link to="request-food">Request Meal</Link>
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-container" id="about">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>About HungerHeal</h1>
          <p>Bridging the gap between food surplus and hunger—one meal at a time.</p>
        </motion.div>

        <div className="about-content">
          <motion.img src={image1} alt="Food Donation" className="about-image" />
          <motion.div className="about-text">
            <h2>Our Mission</h2>
            <p>
              HungerHeal is a non-profit platform dedicated to reducing food waste and ensuring
              surplus food reaches those in need. We connect donors, such as restaurants and
              individuals, with NGOs that distribute food to the underprivileged.
            </p>
          </motion.div>
        </div>

        <div className="about-content reverse">
          <motion.img src={image2} alt="Community Impact" className="about-image" />
          <motion.div className="about-text">
            <h2>Our Vision</h2>
            <p>
              We envision a world where no food goes to waste while millions go hungry. By leveraging
              technology and community support, we aim to create a seamless system for food
              redistribution, ensuring that every meal counts.
            </p>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <motion.div
          className="how-it-works"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>How HungerHeal Works?</h2>
          <ul>
            <li>
              <strong>Step 1:</strong> Donors register and list their surplus food.
            </li>
            <li>
              <strong>Step 2:</strong> NGOs browse available food and request pickup.
            </li>
            <li>
              <strong>Step 3:</strong> Volunteers coordinate transportation and delivery.
            </li>
            <li>
              <strong>Step 4:</strong> Meals reach those in need, reducing food waste.
            </li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>If you have any questions or want to collaborate, reach out to us:</p>
          <p className="contact-email">
            Email: <a href="mailto:support@hungerheal.org">support@hungerheal.org</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
