const express = require("express");
const router = express.Router();
const CartItem = require("../models/cartItem");

console.log("cartItems router");

router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(req.body);
    const item = new CartItem(req.body);
    await item.save();
    res.status(201).json({ message: "product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const deletedItem = await CartItem.findOneAndDelete(req.body);
    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed from cart" });
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

router.patch("/increaseQuantity", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const updatedItem = await CartItem.findOneAndUpdate(
      { userId, productId },
      { $inc: { quantity: 1 } }, // Increment quantity by 1
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res
      .status(200)
      .json({ message: "Product quantity increased successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
