const mongoose = require("mongoose");

const donationCenterSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  contact: String, // phone or email
});

donationCenterSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("DonationCenter", donationCenterSchema);
