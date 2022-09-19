const express = require("express");
const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");

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
    res.status(201).json(savedUser);
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
    console.log("we have decrypted the password");
    if (!req.body.username === decrypted.toString(CryptoJS.enc.Utf8)) return;
    const { password, ...rest } = user._doc;
    console.log(rest, "we have use rest syntax on this object");
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
