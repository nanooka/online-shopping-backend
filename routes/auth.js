const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Sign up http://localhost:3000/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "This email is already registered" });
  }
});

// Log in http://localhost:3000/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Cannot find user" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is not correct" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET, {
      expiresIn: "1h",
    });
    const userID = JSON.parse(atob(token.split(".")[1])).userId;

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({ token, userID });
    console.log(token);
    console.log(userID);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
