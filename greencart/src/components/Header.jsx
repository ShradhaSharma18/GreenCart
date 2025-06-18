// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "../styles/Header.css";

// export default function Header() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/home?search=${encodeURIComponent(query.trim())}`);
//       setQuery("");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <header className="header">
//       <h1 className="header-title">GreenCart 🌱</h1>
//       <nav className="nav-links">
//         <Link to="/home" className="nav-link">Home</Link>
//         <Link to="/cart" className="nav-link">Cart</Link>
//         <Link to="/profile" className="nav-link">Profile</Link>
//         <button onClick={handleLogout} className="logout-btn">Logout</button>
//       </nav>
//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input"
//         />
//         <button type="submit">Search</button>
//       </form>
//     </header>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/home?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header-title">GreenCart 🌱</h1>
      <nav className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
