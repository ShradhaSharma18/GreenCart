const API_BASE = "http://localhost:5000"; // adjust for backend

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_BASE}/cart`);
  return res.json();
};

export const addToCart = async (product) => {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const fetchAlternatives = async (id) => {
  const res = await fetch(`${API_BASE}/alternatives/${id}`);
  return res.json();
};
