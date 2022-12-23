const express = require("express");
const router = express.Router();
const { isAuthenticated, isSeller, isBuyer } = require("../middlewares/auth");
const upload = require("../utils/fileupload");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const stripeKey = require("../config/credential");
const stripe = require("stripe")(stripeKey);
const { WebhookClient } = require("discord.js");

const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1055253034671808584/mYdizbxadq_y-MnTUuojAknR1-JWJpsGeog3pbuHA-2Fslmv2O-WRT8RS0rplH9QHZAS",
});
router.post("/create", isAuthenticated, isSeller, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("incoming err ", err);
      return res.status(500).send(err);
    }
    const { name, price } = req.body;
    if (!name || !price || !req.file) {
      return res.status(400).json({
        err: "Name, price and file are required field",
      });
    }
    if (Number.isNaN(price)) {
      return res.status(400).json({
        err: "price should be a number",
      });
    }
    let productDetails = {
      name,
      price,
      content: req.file.path,
    };
    const savedProduct = await Product.create(productDetails);
    return res.status(200).json({
      status: "ok",
      productDetails: savedProduct,
    });
  });
});

router.get("/get/all", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      err: error,
    });
  }
});

router.post("/buy/:productId", isAuthenticated, isBuyer, async (req, res) => {
  try {
    const productFind = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });
      
      const product = productFind.dataValues;
      console.log(productFind, product)

    webhook.send({
      content: `I am sending from stripe integration with order id: ${product.id}`,
      username: "order-keeper",
      avatarURL:
        "https://cdn.pixabay.com/photo/2021/09/15/08/13/chatbot-6626193_960_720.png",
    });

    // if (!product) {
    //   return res.status(404).json({
    //     err: "No product found",
    //   });
    // }

    // const orderDetails = {
    //   productId: req.params.productId,
    //   buyerId: req.user.id,
    // };

    // let paymentMethod = await stripe.paymentMethod.create({
    //   type: "card",
    //   card: {
    //     number: 4242424242424242,
    //     exp_month: 9,
    //     exp_year: 2023,
    //     cvc: "312",
    //   },
    // });

    // let paymentIntent = await stripe.paymentIntents.create({
    //   amount: product.price,
    //   currency: "inr",
    //   //payment_method_types: ["card"],
    //   payment_method: paymentMethod.id,
    //   //payment_method: 'pm_card_visa',
    //   confirm: true,
    // });
    // console.log(paymentIntent, paymentMethod);

    // if (paymentIntent) {
    //   const createOrder = await Order.create(orderDetails);
    //   webhook.send({
    //     content: `I am sending from stripe integration with order id: ${createOrder.id}`,
    //     username: "order-keeper",
    //     avatarURL:
    //       "https://cdn.pixabay.com/photo/2021/09/15/08/13/chatbot-6626193_960_720.png",
    //   });
    //   return res.status(200).json({
    //     createOrder,
    //   });
    // } else {
    //   console.log(e);
    //   return res.status(400).json({
    //     err: "Payment failed",
    //   });
    // }
  } catch (error) {}
});

module.exports = router;
