const router = require("express").Router();
const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//create cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = req.body;
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).json("Successfully Deleted the Cart...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
