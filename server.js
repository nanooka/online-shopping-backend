const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// const { connectToDb, getDb } = require("./db");

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

// app.listen(3000, () => console.log("Server Started"));

// const app = express();

// let db;

// connectToDb((err) => {
//   if (!err) {
//     app.listen(3000, () => {
//       console.log("app listening on port 3000");
//     });
//     // db = getDb();
//   }
// });

// app.get("/users", (req, res) => {
//   let users = [];
//   db.collection("users")
//     .find()
//     .then(() => {
//       res.status(200).json();
//     })
//     .forEach((user) => users.push(user))
//     .then(() => {
//       res.status(200).json(users);
//     })
//     .catch(() => {
//       res.status(500).json({ error: "Could not fetch the documents" });
//     });

//   console.log(users);
// });

// const authRouter = require("./routes/auth");
// app.use("/auth", authRouter);

// const User = require("./models/user");
// app.get("/auth", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
