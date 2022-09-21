const router = require("express").Router();
const express = require("express");
const Order = require("../models/Order.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//create
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json("This Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Orders
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundOrders = await Order.find({ userId: req.params.id });
    res.status(200).json(foundOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(date.getMonth() - 2));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

//////YOU NEED TO TEST ALL THE ORDER ENDPOINTS
