import { useState, useEffect } from "react";
import "./DonateFood.css";

function DonateFood() {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [donations, setDonations] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await fetch("http://localhost:5000/donate-api/donations");
            if (!response.ok) throw new Error("Failed to fetch donations");

            const data = await response.json();
            setDonations(data);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!foodName || !quantity || !expiryDate || !pickupAddress) {
            setMessage("Please fill all fields!");
            return;
        }

        const newDonation = { foodName, quantity, expiryDate, pickupAddress };

        try {
            const response = await fetch("http://localhost:5000/donate-api/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDonation),
            });

            if (!response.ok) throw new Error("Failed to submit donation");

            setMessage("Food donation submitted successfully!");
            fetchDonations(); // Refresh donations
        } catch (error) {
            setMessage("Error submitting donation");
            console.error("Error:", error);
        }

        setFoodName("");
        setQuantity("");
        setExpiryDate("");
        setPickupAddress("");
    };

    return (
        <div className="donate-food-container">
            <h1 className="title">Donate Food</h1>
            {message && <p className="message">{message}</p>}

            <div className="donation-form-card">
                <form className="donate-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                    <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <textarea placeholder="Pickup Address" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)}></textarea>
                    <button type="submit" className="submit-button">Submit Donation</button>
                </form>
            </div>

            <h2 className="donation-heading">Past Donations</h2>
            <div className="donation-list">
                {donations.length === 0 ? (
                    <p className="no-donations">No donations made yet.</p>
                ) : (
                    <table className="donation-table">
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Quantity</th>
                                <th>Expiry Date</th>
                                <th>Pickup Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => (
                                <tr key={donation._id}>
                                    <td>{donation.foodName}</td>
                                    <td>{donation.quantity}</td>
                                    <td>{donation.expiryDate}</td>
                                    <td>{donation.pickupAddress}</td>
                                    <td className={`status ${donation.status.toLowerCase()}`}>{donation.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default DonateFood;
