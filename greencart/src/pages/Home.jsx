import React, { useEffect, useState } from 'react';
import "../styles/Home.css";
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products?search=${search || ''}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="logo">🌱 GreenCart</h1>
        <p className="tagline">Shop smart, reduce your carbon footprint</p>
        <button className="shop-button">Shop Now</button>
      </header>

      <h2>{search ? `Search Results for "${search}"` : 'Featured Products'}</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">Price: ₹{product.price}</p>
              <p className="carbon">Carbon: {product.carbon}g</p>
              <button className="add-button" onClick={() => addToCart(product)}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

