import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to FoodShare, a community-driven platform dedicated to reducing food waste and helping those in need. Our mission is to connect food donors with local charities and food banks, ensuring that surplus food reaches those who need it most.
            </p>
            <h2>Our Mission</h2>
            <p>
                At FoodShare, we believe that no one should go hungry while there is food available. Our goal is to create a sustainable food system where excess food is redirected to those in need, fostering a sense of community and compassion.
            </p>
            <h2>How It Works</h2>
            <p>
                Donors can easily list surplus food items through our app, and local charities can claim these items for distribution. We facilitate the connection, making the process simple and efficient for everyone involved.
            </p>
            <h2>Get Involved</h2>
            <p>
                Join us in our mission to fight hunger and reduce food waste. Whether you are a food donor, a charity, or a volunteer, there are many ways to get involved. Together, we can make a difference!
            </p>
            <h2>Contact Us</h2>
            <p>
                If you have any questions or would like to learn more about our initiatives, feel free to reach out to us at <a href="mailto:info@foodshare.com">info@foodshare.com</a>.
            </p>
        </div>
    );
};

export default About;