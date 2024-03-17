const usersRouter = require("./routes/auth");
const favoritesRouter = require("./routes/favorites");
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

let bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/auth", usersRouter);

app.use("/favorites", favoritesRouter);

app.listen(3000, () => console.log("Server Started"));
