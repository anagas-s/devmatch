const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);

    res.json({ message: "Received requests", data: connectionRequests });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = userRouter;
