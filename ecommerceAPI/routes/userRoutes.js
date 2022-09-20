require("dotenv").config();
const express = require("express");
const User = require("../models/User.js");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User by Admin
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const { password, ...rest } = foundUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;

    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();
    const filteredUsers = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json("There was an error");
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
