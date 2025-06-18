// import { Link } from "react-router-dom";
// import "../styles/LandingPage.css"; // Style separately

// export default function LandingPage() {
//   return (
//     <div className="landing-wrapper">
//       <section className="hero-section">
//         <h1>Shop Smarter. Live Greener.</h1>
//         <p>GreenCart helps you reduce your carbon footprint by suggesting sustainable alternatives while you shop.</p>
//         <div className="hero-buttons">
//           <Link to="/home"><button className="main-btn">Explore Products</button></Link>
//           <Link to="/signin"><button className="secondary-btn">Sign In</button></Link>
//           <Link to="/signup"><button className="secondary-btn">Sign Up</button></Link>
//         </div>
//       </section>

//       <section className="features-section">
//         <h2>Why Choose GreenCart?</h2>
//         <div className="features-grid">
//           <div className="feature-box">
//             <img src="https://th.bing.com/th/id/OIP.nNyUMyRneHVmwAlcKY5uPgAAAA?w=183&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" alt="Eco Friendly" />
//             <h3>Eco-Friendly Products</h3>
//             <p>Choose from a wide variety of greener alternatives for everyday items. Every product is selected with sustainability in mind.</p>
//           </div>
//           <div className="feature-box">
//             <img src="https://img.icons8.com/ios-filled/100/graph-report.png" alt="Carbon Tracking" />
//             <h3>Carbon Tracking</h3>
//             <p>Know how your shopping choices impact the planet. Track and reduce your carbon footprint one product at a time.</p>
//           </div>
//           <div className="feature-box">
//             <img src="https://img.icons8.com/ios/100/swap.png" alt="Smarter Swaps" />
//             <h3>Smarter Swaps</h3>
//             <p>See suggestions for more eco-friendly items as you shop. Easily swap for lower-carbon alternatives.</p>
//           </div>
//           <div className="feature-box">
//             <img src="https://img.icons8.com/ios/100/charity.png" alt="Donate Orders" />
//             <h3>Donate Old Orders</h3>
//             <p>Support sustainability programs by donating items you’ve previously purchased. Make your impact go further.</p>
//           </div>
//         </div>
//     </section>

//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="landing-wrapper">
      <section className="hero-section">
        <h1>Shop Smarter. Live Greener.</h1>
        <p>
          GreenCart helps you reduce your carbon footprint by suggesting
          sustainable alternatives while you shop.
        </p>
        <div className="hero-buttons">
          <button className="main-btn" onClick={handleExploreClick}>
            Explore Products
          </button>
          <Link to="/signin">
            <button className="secondary-btn">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="secondary-btn">Sign Up</button>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose GreenCart?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <img
              src="https://th.bing.com/th/id/OIP.nNyUMyRneHVmwAlcKY5uPgAAAA?w=183&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
              alt="Eco Friendly"
            />
            <h3>Eco-Friendly Products</h3>
            <p>
              Choose from a wide variety of greener alternatives for everyday
              items. Every product is selected with sustainability in mind.
            </p>
          </div>
          <div className="feature-box">
            <img
              src="https://img.icons8.com/ios-filled/100/graph-report.png"
              alt="Carbon Tracking"
            />
            <h3>Carbon Tracking</h3>
            <p>
              Know how your shopping choices impact the planet. Track and reduce
              your carbon footprint one product at a time.
            </p>
          </div>
          <div className="feature-box">
            <img
              src="https://img.icons8.com/ios/100/swap.png"
              alt="Smarter Swaps"
            />
            <h3>Smarter Swaps</h3>
            <p>
              See suggestions for more eco-friendly items as you shop. Easily
              swap for lower-carbon alternatives.
            </p>
          </div>
          <div className="feature-box">
            <img
              src="https://img.icons8.com/ios/100/charity.png"
              alt="Donate Orders"
            />
            <h3>Donate Old Orders</h3>
            <p>
              Support sustainability programs by donating items you’ve
              previously purchased. Make your impact go further.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
