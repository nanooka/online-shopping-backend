const express = require("express");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  res.send("hello");
});

// Get one user
router.get("/id", (req, res) => {});

module.exports = router;
