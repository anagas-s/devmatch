const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send({ error: "Invalid status" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send({ error: "User not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({ error: "Request already exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // Check if the status is valid
      // status => interested
      //requestId should be valid
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send({ error: "Invalid status" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).send({ error: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request reviewed successfully",
        data,
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
);

module.exports = requestRouter;
