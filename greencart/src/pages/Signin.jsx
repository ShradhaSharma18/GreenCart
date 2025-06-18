import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        setError(data.message || "Signin failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
}
