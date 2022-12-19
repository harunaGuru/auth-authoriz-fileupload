const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validatePassword,
  validateEmail,
  validateName,
} = require("../utils/validators");
const User = require("../models/userModel");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(403).json({
        err: "User already exist",
      });
    }

    if (!validateName(name)) {
      return res.status(400).json({
        err: "Invaid Name: name must be longer than two characters and most not include any number or special characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        err: "Invalid Email",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Invalid Password: password must be atleast 8 characters long and must include atleast one uppercase, one lowercase, one digit, one special character ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, isSeller, password: hashedPassword };
    const createdUser = await User.create(user);
    res.status(201).json({
      message: `Welcome ${createdUser.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res.status(400).json({
        err: "please provide email",
      });
    }
    if (password.length === 0) {
      return res.status(400).json({
        err: "please provide a password",
      });
    }
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(400).json({
        err: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        err: "email or password mismatched",
      });
    }
    const payload = { user: { id: existingUser.id } };
    const bearerToken = await jwt.sign(payload, "SECRET MESSAGE", {
      expiresIn: 360000,
    });

    res.cookie("t", bearerToken, {
      expire: new Date() + 9999,
    });

    res.status(200).json({
      bearerToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/signout", (req, res) => {
    try {
        res.clearCookie("t");
        return res.status(200).json({
            message: "cookie deleted"
        })
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;
