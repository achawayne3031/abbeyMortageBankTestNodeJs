import express from "express";
import cors from "cors";
const bodyParser = require("body-parser");
const authRouter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const followerRouter = require("./src/router/followerRouter");
const friendRouter = require("./src/router/friendRouter");
const peerRouter = require("./src/router/peerRouter");
const MysqlDB = require("./src/database/MysqlDB");

const app = express();
const port = process.env.PORT || 3000;

MysqlDB.initialize();

app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // handle URL-encoded form data

///// Auth //////
app.use("/api/auth", authRouter);

///// Users //////
app.use("/api/users", userRouter);

///// Follower //////
app.use("/api/follower", followerRouter);

///// Friend //////
app.use("/api/friend", friendRouter);

///// Peer //////
app.use("/api/peer", peerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
