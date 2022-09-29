require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const Product = require("../models/Product.js");
const {
  verifyTokenAndAuthenticate,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cors = require("cors");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({ origin: "http://localhost:3000" }));
//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    //we first create our Product in Stripe and have this returned Id
    const stripeProduct = await stripe.products.create({
      name: req.body.title,
      description: req.body.desc,
      images: [req.body.img],
    });
    //we create a price that is associated with the stripe product
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: req.body.price * 100,
      currency: "eur",
    });
    //we then create our mongo document with the associated stripe references also contained
    const newProduct = new Product({
      ...req.body,
      stripe: { productId: stripeProduct.id, priceId: stripePrice.id },
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const productToUpdate = await Product.findById(req.params.id);
    //we do a number of checks to see whether the items pertaining to the product held by
    //stripe has been changed and update these if necessary
    let stripeUpdateObj = {};
    if (req.body.title) stripeUpdateObj.name = req.body.title;
    if (req.body.img) stripeUpdateObj.images = [req.body.img];
    if (req.body.desc) stripeUpdateObj.description = req.body.desc;
    //if we have changed anything then the object will not be empty and will need to be
    //uploaded
    if (stripeUpdateObj !== {}) {
      await stripe.products.update(
        productToUpdate.stripe.productId,
        stripeUpdateObj
      );
    }
    //if there is a changed price we will have to create a new stripe price and associate it with
    //the product
    if (req.body.price) {
      const newStripePrice = await stripe.prices.create({
        product: productToUpdate.stripe.productId,
        unit_amount: req.body.price * 100,
        currency: "eur",
      });
      productToUpdate.stripe.priceId = newStripePrice.id;
    }
    //combine the two objects together without having to make a shallow copy, this
    //updates the productToUpdate object so we can still save it
    Object.assign(productToUpdate, req.body);
    const savedObject = await productToUpdate.save();
    res.status(200).json(savedObject);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
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
  console.log("products get endpoint hit");
  const qNew = req.query.qNew;
  const qCategory = req.query.qCategory;

  try {
    let products = [];

    if (qNew) {
      console.log("qNew is being triggered");
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      console.log(qCategory);
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
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
