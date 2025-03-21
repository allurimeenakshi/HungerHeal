import { useState } from "react";
import "./RequestFood.css";

const RequestFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Food request submitted:", formData);
    alert("Your request has been submitted!");
    setFormData({ name: "", contact: "", location: "", reason: "" });
  };

  return (
    <div className="request-container">
      <div className="request-card">
        <h2 className="request-title">Request Food Assistance</h2>
        <p className="request-subtitle">
          Fill in the details below, and we’ll help connect you with available food resources.
        </p>

        <form onSubmit={handleSubmit} className="request-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location (City, Area)"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="reason"
            placeholder="Reason for requesting food"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="submit-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestFood;
