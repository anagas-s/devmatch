const express = require("express");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // Save the user to the database
    await user.save();
    res.send("User created");
  } catch (err) {
    console.error(err);
    res.send("Error creating user");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      // Set the token in the cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
      });
      res.send("User logged in");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

module.exports = authRouter;
