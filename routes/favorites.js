const express = require("express");
const router = express.Router();
const Favorite = require("../models/favorite");

let bodyParser = require("body-parser");
// const authToken = require("./authHelper");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// router.use(authToken);

let userId;
let productId;

router.get("/getId", (req, res) => {
  try {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    const userID = JSON.parse(atob(token.split(".")[1])).userId;
    res.json(userID);
    res.send(userID);
  } catch (error) {
    res.send("erroriii");
  }
});

router.post("/add", async (req, res) => {
  try {
    userId = req.body.userId;
    productId = req.body.productId;
    console.log("es aris req badi: ", req.body);
    console.log("es aris iuseraidi: ", userId);
    console.log("es aris produqt aidi: ", productId);

    const fav = new Favorite({ userId, productId });
    await fav.save();
    res
      .status(201)
      .json({ message: `product added successfullyy ${userId} ${productId}` });
  } catch (err) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

module.exports = router;
