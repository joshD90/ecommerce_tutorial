const express = require("express");
const router = require("express").Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/usertest", (req, res) => {
  res.send("user test is successful");
});

router.post("/userPost", (req, res) => {
  const username = req.body.username;
  res.send(`username is now stored as ${username}`);
});

module.exports = router;
