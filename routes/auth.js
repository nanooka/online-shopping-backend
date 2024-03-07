const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const saltRounds = 12;

let bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Sign up http://localhost:3000/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const dublicateUser = await User.findOne({ email: email });
    if (dublicateUser === null) {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(201).json(newUser);
    } else {
      res.status(400).send("This email is already registered!");
    }
  } catch (err) {
    res.status(500).send("can not register");
  }
});

// Log in http://localhost:3000/auth/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Cannot find user");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Logged in successfully");
      console.log(user);
    } else {
      res.send("Password is not correct");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
