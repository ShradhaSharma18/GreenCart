import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // We'll create a shared style file

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    postalCode: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // Save token & navigate to home
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required/>
        <button type="submit">Sign Up</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
}
