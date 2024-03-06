const express = require("express");
const router = express.Router();
const User = require("../models/user");

let bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Creating One http://localhost:3000/auth/signup
router.post("/signup", async (req, res) => {
  // console.log("postiingg " user);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    // userToChannel: req.body.userToChannel,
  });
  console.log("postiingg auth.js", req.body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
