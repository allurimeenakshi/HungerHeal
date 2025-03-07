import React, { useState } from 'react';
import './Feedback.css'; // Make sure to import your CSS file

const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., send data to an API
        console.log({ name, email, message });
        setSubmitted(true);
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="feedback-form-container">
            <h1 className="feedback-form-title">Feedback Form</h1>
            {submitted ? (
                <div className="thank-you-message">
                    Thank you for your feedback!
                </div>
            ) : (
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="feedback-input"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="feedback-input"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        className="feedback-textarea"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit" className="feedback-submit-button">
                        Submit Feedback
                    </button>
                </form>
            )}
        </div>
    );
};

export default Feedback;
