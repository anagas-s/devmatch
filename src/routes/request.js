const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Ending a connection request");
    res.send(user.firstName + "Sent the connection request");
  } catch (err) {
    console.error(err);
    res.send("Error sending connection request");
  }
});

module.exports = requestRouter;
