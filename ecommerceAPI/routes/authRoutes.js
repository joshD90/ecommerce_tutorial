const express = require("express");
const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    const { password, ...rest } = savedUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("we could not find this user");
    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_KEY
    );

    if (req.body.password !== decrypted.toString(CryptoJS.enc.Utf8)) {
      return res.status(401).json("Wrong Credentials");
    }

    if (req.body.password === decrypted.toString(CryptoJS.enc.Utf8)) {
      const accessToken = jwt.sign(
        { id: user._id, admin: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      const { password, ...rest } = user._doc;
      res.status(200).json({ ...rest, accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
