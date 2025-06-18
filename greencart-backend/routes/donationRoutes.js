const express = require("express");
const router = express.Router();
const DonationCenter = require("../models/DonationCenter");

// POST /api/donate
router.post("/", async (req, res) => {
  const { userPostalCode } = req.body;

  if (!userPostalCode) {
    return res.status(400).json({ error: "Postal code required" });
  }

  try {
    // Find the closest center by postal code (exact match for now)
    const center = await DonationCenter.findOne({ postalCode: userPostalCode });

    if (!center) {
      return res.status(404).json({ error: "No donation center found nearby" });
    }

    // Simulate notification
    console.log(`📢 Notified ${center.name} at ${center.contact} for a donation pickup.`);

    res.json({
      message: "Donation request sent successfully",
      center,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
