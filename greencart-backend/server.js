const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Add this line

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // ✅ Register auth routes

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🌿 GreenCart backend is running');
});

const donationRoutes = require("./routes/donationRoutes");
app.use("/api/donate", donationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
