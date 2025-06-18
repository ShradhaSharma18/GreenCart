// import React, { useState } from 'react';
// import "../styles/Cart.css";
// import { useCart } from '../context/CartContext';
// import axios from 'axios';

// const Cart = () => {
//   const { cartItems, removeFromCart, addToCart } = useCart();
//   const [betterOptions, setBetterOptions] = useState({}); // store alternatives by item ID

//   const fetchBetterOption = async (itemId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/products/${itemId}/better-option`);
//       setBetterOptions(prev => ({ ...prev, [itemId]: response.data }));
//     } catch (err) {
//       console.error("No better option found or error occurred", err);
//       setBetterOptions(prev => ({ ...prev, [itemId]: null }));
//     }
//   };

//   const switchToBetterOption = (oldItemId, newItem) => {
//     removeFromCart(oldItemId);
//     addToCart(newItem);
//     setBetterOptions(prev => ({ ...prev, [oldItemId]: null }));
//   };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in your cart.</p>
//       ) : (
//         cartItems.map((item) => (
//           <div className="order-card" key={item._id}>
//             <div className="order-left">
//               <img src={item.image} alt={item.name} />
//             </div>

//             <div className="order-right">
//               <h3>{item.name}</h3>
//               <p className="price">Price: ₹{item.price}</p>
//               <p className="carbon-footprint">Carbon: {item.carbon} kg CO₂</p>
//               <div className="button-group">
//                 <button className="alt-button" onClick={() => fetchBetterOption(item._id)}>
//                   See Better Option
//                 </button>
//                 <button className="alt-button" onClick={() => removeFromCart(item._id)}>
//                   Remove
//                 </button>
//               </div>

//               {/* Show better alternative */}
//               {betterOptions[item._id] && (
//                 <div className="popup">
//                   <button
//                     className="popup-close"
//                     onClick={() => setBetterOptions(prev => ({ ...prev, [item._id]: null }))}
//                   >
//                     ❌
//                   </button>
//                   <h4>Better Option</h4>
//                   <img
//                     src={betterOptions[item._id].image}
//                     alt={betterOptions[item._id].name}
//                     className="alt-image"
//                   />
//                   <div className="alt-name">{betterOptions[item._id].name}</div>
//                   <p>Price: ₹{betterOptions[item._id].price}</p>
//                   <p>Carbon: {betterOptions[item._id].carbon} kg CO₂</p>
//                   <button
//                     className="add-button"
//                     onClick={() => switchToBetterOption(item._id, betterOptions[item._id])}
//                   >
//                     Add
//                   </button>
//                 </div>
//               )}

//               {/* Handle case when no better option */}
//               {betterOptions[item._id] === null && (
//                 <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>No better option available.</p>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState } from 'react';
import "../styles/Cart.css";
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [betterOptions, setBetterOptions] = useState({});
  const navigate = useNavigate();

  const fetchBetterOption = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${itemId}/better-option`);
      setBetterOptions(prev => ({ ...prev, [itemId]: response.data }));
    } catch (err) {
      console.error("No better option found or error occurred", err);
      setBetterOptions(prev => ({ ...prev, [itemId]: null }));
    }
  };

  const switchToBetterOption = (oldItemId, newItem) => {
    removeFromCart(oldItemId);
    addToCart(newItem);
    setBetterOptions(prev => ({ ...prev, [oldItemId]: null }));
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity || 1,
          })),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Failed to place order: " + err.message);
        return;
      }

      alert("✅ Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.reload();
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        cartItems.map((item) => (
          <div className="order-card" key={item._id}>
            <div className="order-left">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="order-right">
              <h3>{item.name}</h3>
              <p className="price">Price: ₹{item.price}</p>
              <p className="carbon-footprint">Carbon: {item.carbon} kg CO₂</p>
              <div className="button-group">
                <button className="alt-button" onClick={() => fetchBetterOption(item._id)}>
                  See Better Option
                </button>
                <button className="alt-button" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>

              {betterOptions[item._id] && (
                <div className="popup">
                  <button
                    className="popup-close"
                    onClick={() => setBetterOptions(prev => ({ ...prev, [item._id]: null }))}
                  >
                    ❌
                  </button>
                  <h4>Better Option</h4>
                  <img
                    src={betterOptions[item._id].image}
                    alt={betterOptions[item._id].name}
                    className="alt-image"
                  />
                  <div className="alt-name">{betterOptions[item._id].name}</div>
                  <p>Price: ₹{betterOptions[item._id].price}</p>
                  <p>Carbon: {betterOptions[item._id].carbon} kg CO₂</p>
                  <button
                    className="add-button"
                    onClick={() => switchToBetterOption(item._id, betterOptions[item._id])}
                  >
                    Add
                  </button>
                </div>
              )}

              {betterOptions[item._id] === null && (
                <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>No better option available.</p>
              )}
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;
