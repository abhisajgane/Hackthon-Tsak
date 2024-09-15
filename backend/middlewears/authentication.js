const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res
        .status(401)
        .send({ error: "Unauthorized", msg: "Please login" });
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, async (error, decode) => {
      if (decode) {
        // console.log("Middlweare", decode.user);
        req.user = decode.user;
        next();
      } else {
        res
          .status(401)
          .send({ error: "Unauthorized", msg: "Please login first." });
      }
    });
  } catch (error) {}
};

module.exports = authentication;
