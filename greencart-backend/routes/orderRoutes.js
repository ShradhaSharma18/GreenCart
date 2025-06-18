const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const DonationCenter = require('../models/DonationCenter');
const User = require('../models/User');

router.post("/", protect, async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;
    let carbonSaved = 0;

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");

        // ✅ Clean and convert price string like "₹349" to number 349
        const rawPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
        const rawCarbon = parseFloat(product.carbon.replace(/[^\d.]/g, ''));
        const quantity = Number(item.quantity);

        if (isNaN(rawPrice) || isNaN(rawCarbon) || isNaN(quantity)) {
          throw new Error("Invalid product data or quantity");
        }

        total += rawPrice * quantity;
        carbonSaved += rawCarbon * quantity;

        return {
          productId: product._id,
          quantity,
        };
      })
    );

    const order = await Order.create({
      userId: req.user.id,
      items: detailedItems,
      total,
      carbonSaved,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Failed to place order:", err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get orders of the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name price carbon image")  // Populate product details
      .sort({ createdAt: -1 }); // Most recent first

    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// PUT /api/orders/:orderId/donate/:productName
// PUT /api/orders/:orderId/donate/:productName
router.put('/:orderId/donate/:productName', protect, async (req, res) => {
  const { orderId, productName } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.postalCode) {
      return res.status(400).json({ message: 'User postal code not found' });
    }

    // Find the order
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the item to donate
    const itemToDonate = order.items.find(
      (item) => item.productId?.name === productName
    );

    if (!itemToDonate) {
      return res.status(404).json({ message: 'Product not found in the order' });
    }

    // Mark as donated
    itemToDonate.donated = true;
    await order.save();

    // Find nearest donation center (simplified)
    const center = await DonationCenter.findOne(); // You can use location logic later

    if (!center) {
      return res.status(404).json({ message: 'No donation center found nearby' });
    }

    // Simulated notification
    console.log(`📦 Notification sent to ${center.name} to pick up "${productName}" from user at postal code ${user.postalCode}.`);

    res.json({
      message: `Donation request sent to ${center.name}. Pickup will be arranged soon.`,
      center
    });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: 'Failed to process donation', error: err.message });
  }
});

module.exports = router;