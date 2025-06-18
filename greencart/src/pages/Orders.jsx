// import React, { useEffect, useState } from "react";
// import "../styles/Orders.css";
// import { useCart } from "../context/CartContext";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setOrders(data);
//     };

//     fetchOrders();
//   }, []);

//   const handleRepeatPurchase = (items) => {
//     items.forEach((item) => {
//       const product = item.productId;
//       if (product) {
//         addToCart({
//           _id: product._id,
//           name: product.name,
//           price: product.price,
//           carbon: product.carbon,
//           image: product.image,
//           quantity: item.quantity,
//         });
//       }
//     });
//   };

//   return (
//     <div className="orders-container">
//       <h2>Your Previous Orders</h2>
//       {orders.length === 0 ? (
//         <p>No previous orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//             <ul>
//               {order.items.map((item, index) => (
//                 <li key={index}>
//                   {item.productId?.name} - ₹{item.productId?.price} ({item.productId?.carbon} CO₂)
//                 </li>
//               ))}
//             </ul>
//             <p><strong>Total:</strong> ₹{order.total}</p>
//             <p><strong>Carbon Saved:</strong> {order.carbonSaved} kg 🌿</p>
//             <div className="order-actions">
//               <button
//                 className="repeat-btn"
//                 onClick={() => handleRepeatPurchase(order.items)}
//               >
//                 Repeat Purchase
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import "../styles/Orders.css";
import { useCart } from "../context/CartContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleRepeatPurchase = (items) => {
    items.forEach((item) => {
      const product = item.productId;
      if (product) {
        addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          carbon: product.carbon,
          image: product.image,
          quantity: item.quantity,
        });
      }
    });
  };

  const handleDonate = async (orderId, productName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/donate/${encodeURIComponent(productName)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Donation arranged successfully.");

        // Optional: Mark the item as donated in the UI
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId
              ? {
                  ...order,
                  items: order.items.map(item =>
                    item.productId?.name === productName
                      ? { ...item, donated: true }
                      : item
                  )
                }
              : order
          )
        );
      } else {
        alert(data.message || "Donation failed.");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("An error occurred while processing the donation.");
    }
  };

  return (
    <div className="orders-container">
      <h2>Your Previous Orders</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.productId?.name} - ₹{item.productId?.price} ({item.productId?.carbon} CO₂)
                  {item.donated ? (
                    <span className="donated-label"> ✅ Donated</span>
                  ) : (
                    <button
                      className="donate-btn"
                      onClick={() => handleDonate(order._id, item.productId?.name)}
                      style={{ marginLeft: "10px" }}
                    >
                      Donate Product
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Carbon Saved:</strong> {order.carbonSaved} kg 🌿</p>
            <div className="order-actions">
              <button
                className="repeat-btn"
                onClick={() => handleRepeatPurchase(order.items)}
              >
                Repeat Purchase
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
