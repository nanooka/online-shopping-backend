const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// function authToken(req, res, next) {
//   const auth = req.headers.authorization;
//   const token = auth.split(" ")[1];
//   console.log("es aris tokeniiiiii: ", token);
//   // console.log("Auth: ", auth);
//   const decodedToken = JSON.parse(atob(token.split(".")[1]));
//   // console.log("decodedToken: ", decodedToken);
//   // const decode = jwt.verify(token, process.env.MY_SECRET);
//   // console.log("decodeeeeeeeeeeeee: ", decode);

//   // if (token) {
//   //   // jwt.verify(token, process.env.MY_SECRET, (err, user) => {
//   //   //   if (err) {
//   //   //     console.log("es aris erroririii: ", err);
//   //   //     return res
//   //   //       .status(403)
//   //   //       .json({ message: `nanuka var ${decodedToken.userId} ${user}` });
//   //   //   }
//   //   //   // console.log(user);

//   //   //   // req.user = user;
//   //   //   next();
//   //   // });
//   //   // const decode = jwt.verify(token, process.env.MY_SECRET);
//   //   res.json({
//   //     logint: true,
//   //     data: decode,
//   //   });
//   // } else {
//   //   // res.status(401).json({ message: "Givia var" });
//   //   res.json({
//   //     login: false,
//   //     data: error,
//   //   });
//   // }
//   if (!token) {
//     return res.status(403).send({ auth: false, message: "nonono" });
//   }
//   jwt.verify(token, process.env.MY_SECRET, function (error, decoded) {
//     if (error) {
//       return res.status(500).send({ auth: false, message: error });
//     }
//     console.log(decoded);
//     next();
//   });
// }

function authToken(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(403).send({ auth: false, message: "Token is missing" });
  }

  const token = auth.split(" ")[1];
  console.log("Tokeniiiiiiiiii     ", token);

  jwt.verify(token, process.env.MY_SECRET, function (error, decoded) {
    if (error) {
      return res.status(403).send({ auth: false, message: error.message });
    }
    console.log("Decoded Tokeeeeennn      ", decoded);
    next();
  });
}

module.exports = router;
