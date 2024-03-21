const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const authRouter = require("./routes/auth");
const authToken = require("./routes/authHelper");
const favoritesRouter = require("./routes/favorites");
const cartRouter = require("./routes/cart");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/auth", authRouter);
// app.use(authToken);
app.use("/favorites", authToken, favoritesRouter);
app.use("/cart", authToken, cartRouter);

app.listen(3000, () => console.log("Server Started"));
