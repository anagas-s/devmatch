const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const app = express();
app.use(express.json());

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.error(err);
    res.send("Error getting users");
  }
});

module.exports = profileRouter;
