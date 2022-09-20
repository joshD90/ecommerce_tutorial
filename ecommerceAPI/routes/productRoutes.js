const express = require("express");
const router = require("express").Router();
const Product = require("../models/Product.js");
const {
  verifyTokenAndAuthenticate,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Product
router.get("/find/:id", async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all products
router.get("/", async (req, res) => {
  const qNew = req.query.qNew;
  const qCategory = req.query.qCategory;

  try {
    let products = [];

    if (qNew) {
      console.log("qNew is being triggered");
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
