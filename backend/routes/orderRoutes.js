const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (
      !customer ||
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode ||
      !items ||
      items.length === 0 ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Missing order information",
      });
    }

    const order = new Order({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },

      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
      },

      items,

      totalAmount,

      paymentMethod:
        paymentMethod || "Cash on Delivery",

      status:
        paymentMethod === "Cash on Delivery"
          ? "Confirmed"
          : "Pending",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

module.exports = router;