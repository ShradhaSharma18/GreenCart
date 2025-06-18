// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    // Decode token to get user data (simplified)
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
      </div>
    </div>
  );
}

