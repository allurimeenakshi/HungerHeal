import { useState, useEffect } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedback-api/feedbacks");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server");
      }

      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleInputChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/feedback-api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);

      setResponseMessage("Thank you for your feedback!");
      fetchFeedback();
    } catch (error) {
      setResponseMessage("Error submitting feedback.");
      console.error("Error:", error);
    }

    setFeedbackData({ name: "", email: "", message: "" });
  };

  return (
    <div className="feedback-page">
      <div className="feedback-form-container">
        <h1>Share Your Feedback</h1>
        {responseMessage && <p className="response-message">{responseMessage}</p>}

        <form className="feedback-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={feedbackData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={feedbackData.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={feedbackData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {/* Opinions Section - Completely Outside the Form */}
      <div className="opinions-section">
        <h2 className="opinions-heading">Reviews</h2>
        <div className="feedback-list">
          {feedbackList.map((item, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-header">
                <strong>{item.name}</strong>
                <span className="feedback-email">{item.email}</span>
              </div>
              <p className="feedback-message">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
