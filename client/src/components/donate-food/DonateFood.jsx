import React, { useState } from "react";
import "./DonateFood.css";

function DonateFood() {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [image, setImage] = useState(null);
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!foodName || !quantity || !expiryDate || !pickupAddress) {
            setMessage("Please fill all fields!");
            return;
        }
        const newDonation = {
            id: donations.length + 1,
            foodName,
            quantity,
            expiryDate,
            pickupAddress,
            image,
            status: "Pending",
        };
        setDonations([...donations, newDonation]);

        // Reset form fields
        setFoodName("");
        setQuantity("");
        setExpiryDate("");
        setPickupAddress("");
        setImage(null);
        event.target.reset(); // Resets the file input field

        setMessage("Food donation submitted successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="donate-food-container">
            <h1 className="title">Donate Food</h1>

            {message && <p className="message">{message}</p>}

            <form className="donate-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
                <textarea
                    placeholder="Pickup Address"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                ></textarea>
                <input type="file" className="file-input" onChange={handleImageUpload} />
                {image && <img src={image} alt="Preview" className="food-image" />}
                <button type="submit" className="submit-button">Submit Donation</button>
            </form>

            <h2 className="subtitle">Your Past Donations</h2>
            {donations.length === 0 ? (
                <p className="no-donations">No donations made yet.</p>
            ) : (
                <ul className="donation-list">
                    {donations.map((donation) => (
                        <li key={donation.id} className="donation-card">
                            {donation.image && <img src={donation.image} alt={donation.foodName} className="food-image" />}
                            <p><strong>🍽 {donation.foodName}</strong> - {donation.quantity} units</p>
                            <p>📅 Expiry Date: {donation.expiryDate}</p>
                            <p>📍 Pickup Address: {donation.pickupAddress}</p>
                            <p className={`status ${donation.status.toLowerCase()}`}>Status: {donation.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DonateFood;
