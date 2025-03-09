import React, { useState } from "react";
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
      <h1 className="request-title">Request Food</h1>
      <p className="request-subtitle">Fill in the details to request food assistance.</p>

      <form onSubmit={handleSubmit} className="request-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
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
          placeholder="Your Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for Requesting Food"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>
        
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestFood;
