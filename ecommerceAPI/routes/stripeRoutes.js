const router = require("express").Router();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Product = require("../models/Product.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", verifyToken, async (req, res) => {
  try {
    //the promise.all holds all the various different promises which are returned
    //from the mongoose find function
    const listOfPriceIds = await Promise.all(
      req.body.items.map(async (item) => {
        const result = await Product.findById(item.id);
        return {
          priceId: result.stripe.priceId,
          quantity: item.quantity,
        };
      })
    );

    console.log(listOfPriceIds, "should be after Mapping function");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
      line_items: listOfPriceIds.map((item) => {
        return {
          price: item.priceId,
          quantity: item.quantity,
        };
      }),
    });
    res.status(200).json(session.url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
