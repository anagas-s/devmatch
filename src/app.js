const express = require("express");
const connect = require("./config/database");
const validator = require("validator");
const User = require("./models/user");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connect()
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });
