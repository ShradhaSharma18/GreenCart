// tools/seedDonationCenters.js

const mongoose = require("mongoose");
require("dotenv").config(); // Load .env
const connectDB = require("../db");
const DonationCenter = require("../models/DonationCenter");

const centers = [
  {
    name: "Green Delhi Donation Hub",
    address: "Connaught Place, Delhi",
    postalCode: "110001",
    contact: "donate-delhi@example.com",
    location: {
      type: "Point",
      coordinates: [77.2090, 28.6139], // Delhi (longitude, latitude)
    },
  },
  {
    name: "Bangalore Eco Center",
    address: "MG Road, Bangalore",
    postalCode: "560001",
    contact: "donate-blr@example.com",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716], // Bangalore (longitude, latitude)
    },
  },
];

const seedCenters = async () => {
  try {
    await connectDB(); // Reuse existing DB connection
    await DonationCenter.deleteMany(); // Optional: clean existing data
    await DonationCenter.insertMany(centers);
    console.log("✅ Donation centers seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedCenters();
