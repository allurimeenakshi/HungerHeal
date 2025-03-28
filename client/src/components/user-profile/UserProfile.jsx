import  { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/user-profile")
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={`https://www.gravatar.com/avatar/${user.emailHash}?d=identicon`}
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Account Type: {user.type}</p>
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
