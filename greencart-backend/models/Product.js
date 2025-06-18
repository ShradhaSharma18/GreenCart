const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: String, // e.g., "₹349"
  carbon: String, // e.g., "0.3 kg CO₂"
  material: String,
  co2_estimate: Number, // For calculations
  eco_score: Number,
  image: String,
  alternative: {
    name: String,
    price: String,
    carbon: String,
    image: String
  }
});

module.exports = mongoose.model('Product', productSchema);
