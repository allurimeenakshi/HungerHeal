import { useState, useEffect } from "react";
import "./RequestFood.css";

const RequestFood = () => {
  const [requestDetails, setRequestDetails] = useState({
    fullName: "",
    contactNumber: "",
    emailAddress: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    numberOfPeople: "",
    preferredFoodType: "Any",
    requestReason: "",
    requestDate: "",
    deliveryPreference: "Delivery",
  });

  const [requestsList, setRequestsList] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle state for form visibility

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/request-api/requests");
      const data = await response.json();
      setRequestsList(data);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  const handleInputChange = (e) => {
    setRequestDetails({ ...requestDetails, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/request-api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestDetails),
      });

      if (!response.ok) throw new Error("Submission failed");

      setResponseMessage("Your food request has been successfully submitted!");
      loadRequests();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      setResponseMessage("Error submitting your request.");
      console.error("Error:", error);
    }

    setRequestDetails({
      fullName: "",
      contactNumber: "",
      emailAddress: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      numberOfPeople: "",
      preferredFoodType: "Any",
      requestReason: "",
      requestDate: "",
      deliveryPreference: "Delivery",
    });
  };

  return (
    <div className="request-food-page">
      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Request Form" : "Request Food"}
      </button>

      {showForm && (
        <div className="request-food-container">
          <h1 className="form-heading">Request Food Assistance</h1>
          {responseMessage && <p className="response-message">{responseMessage}</p>}

          <form className="food-request-form" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <input type="text" name="fullName" placeholder="Full Name" value={requestDetails.fullName} onChange={handleInputChange} required />
              <input type="tel" name="contactNumber" placeholder="Contact Number" value={requestDetails.contactNumber} onChange={handleInputChange} required />
              <input type="email" name="emailAddress" placeholder="Email Address" value={requestDetails.emailAddress} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <input type="text" name="streetAddress" placeholder="Street Address" value={requestDetails.streetAddress} onChange={handleInputChange} required />
              <input type="text" name="city" placeholder="City" value={requestDetails.city} onChange={handleInputChange} required />
              <input type="text" name="postalCode" placeholder="Postal Code" value={requestDetails.postalCode} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <input type="number" name="numberOfPeople" placeholder="Number of People" value={requestDetails.numberOfPeople} onChange={handleInputChange} required />
              <select name="preferredFoodType" value={requestDetails.preferredFoodType} onChange={handleInputChange}>
                <option value="Any">Any</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <textarea name="requestReason" placeholder="Why do you need food assistance?" value={requestDetails.requestReason} onChange={handleInputChange} required></textarea>

            <div className="input-group">
              <input type="date" name="requestDate" value={requestDetails.requestDate} onChange={handleInputChange} required />
              <select name="deliveryPreference" value={requestDetails.deliveryPreference} onChange={handleInputChange}>
                <option value="Delivery">Delivery</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </div>
      )}

      <h2 className="requests-heading">Submitted Requests</h2>
      <div className="requests-list">
        {requestsList.length === 0 ? (
          <p className="no-requests">No food requests yet.</p>
        ) : (
          requestsList.map((req, index) => (
            <div key={index} className="request-card">
              <h3>{req.fullName}</h3>
              <p><strong>Contact:</strong> {req.contactNumber}</p>
              <p><strong>Email:</strong> {req.emailAddress}</p>
              <p><strong>Address:</strong> {req.streetAddress}, {req.city}, {req.postalCode}</p>
              <p><strong>Persons Count:</strong> {req.numberOfPeople}</p>
              <p><strong>Food Type:</strong> {req.preferredFoodType}</p>
              <p><strong>Reason:</strong> {req.requestReason}</p>
              <p><strong>Request Date:</strong> {req.requestDate}</p>
              <p><strong>Delivery:</strong> {req.deliveryPreference}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestFood;
