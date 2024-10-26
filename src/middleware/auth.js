const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // Read the token from the req cookies
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedObj = await jwt.verify(token, "DEV@MATCH@123");
    // Validate the token
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
