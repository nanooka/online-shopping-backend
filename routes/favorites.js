const express = require("express");
const router = express.Router();
const Favorite = require("../models/favorite");

let bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("es aris req badi: ", req.body);
    console.log("es aris iuseraidi: ", userId);
    console.log("es aris produqt aidi: ", productId);

    const fav = new Favorite({ userId, productId });
    await fav.save();
    res.status(201).json({ message: "product added successfullyy" });
  } catch (err) {
    res.status(500).json({ error: "Internall Server Error" });
  }
});

module.exports = router;
