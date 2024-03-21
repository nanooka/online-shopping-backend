const express = require("express");
const router = express.Router();
const Favorite = require("../models/favorite");

// let bodyParser = require("body-parser");
// // const authToken = require("./authHelper");
// router.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// router.use(authToken);

// let userId;
// let productId;

router.post("/add", async (req, res) => {
  try {
    // userId = req.body.userId;
    // productId = req.body.productId;
    const { userId, productId } = req.body;
    const fav = new Favorite(req.body);
    await fav.save();
    res
      .status(201)
      .json({ message: `product added successfullyy ${userId} ${productId}` });
  } catch (err) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const deletedFavorite = await Favorite.findOneAndDelete(req.body);

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product removed from Favorites successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

module.exports = router;
