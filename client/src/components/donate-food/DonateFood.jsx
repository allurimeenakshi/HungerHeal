import { useState, useEffect } from "react";
import "./DonateFood.css";

function DonateFood() {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [foodType, setFoodType] = useState("Vegetarian");
    const [pickupTime, setPickupTime] = useState("");
    const [notes, setNotes] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await fetch("https://hungerheal.onrender.com/donate-api/donations");
            if (!response.ok) throw new Error("Failed to fetch donations");
            const data = await response.json();
            setDonations(data);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!foodName || !quantity || !expiryDate || !pickupAddress || !contactNumber || !pickupTime) {
            setMessage("Please fill all required fields!");
            return;
        }

        const newDonation = { foodName, quantity, expiryDate, pickupAddress, foodType, pickupTime, notes, contactNumber };

        try {
            const response = await fetch("https://hungerheal.onrender.com/donate-api/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDonation),
            });

            if (!response.ok) throw new Error("Failed to submit donation");

            setMessage("Food donation submitted successfully!");
            fetchDonations();
        } catch (error) {
            setMessage("Error submitting donation");
            console.error("Error:", error);
        }

        setFoodName("");
        setQuantity("");
        setExpiryDate("");
        setPickupAddress("");
        setFoodType("Vegetarian");
        setPickupTime("");
        setNotes("");
        setContactNumber("");
    };

    return (
        <div className="donate-food-page">
            <button className="donate-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Form" : "Donate Food"}
            </button>

            {showForm && (
                <div className="donate-food-container">
                    <h2 className="title">Donate Food</h2>
                    {message && <p className="message">{message}</p>}
                    <form className="donate-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        <textarea placeholder="Enter full address with street, city & landmarks" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)}></textarea>
                        <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                        <label>
                            Preferred Pickup Time:
                            <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
                        </label>
                        <input type="tel" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                        <textarea placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        <button type="submit" className="submit-button">Submit Donation</button>
                    </form>
                </div>
            )}

            <h2 className="donation-heading">Past Donations</h2>
            <div className="donation-list">
                {donations.length === 0 ? (
                    <p className="no-donations">No donations made yet.</p>
                ) : (
                    donations.map((donation) => (
                        <div key={donation._id} className="donation-card">
                            <h3>{donation.foodName}</h3>
                            <p><strong>Quantity:</strong> {donation.quantity}</p>
                            <p><strong>Expiry Date:</strong> {donation.expiryDate}</p>
                            <p><strong>Pickup Address:</strong> {donation.pickupAddress}</p>
                            <p><strong>Food Type:</strong> {donation.foodType}</p>
                            <p><strong>Preferred Pickup Time:</strong> {donation.pickupTime || "Anytime"}</p>
                            <p><strong>Contact:</strong> {donation.contactNumber}</p>
                            <p><strong>Notes:</strong> {donation.notes || "No additional notes"}</p>
                            <button className="request-button">Request</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DonateFood;
