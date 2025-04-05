import * as express from "express";
const FollowerController = require("../controllers/followerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/follow-user", [authMiddleware], FollowerController.followerUser);

router.post(
  "/unfollow-user",
  [authMiddleware],
  FollowerController.unFollowerUser
);

module.exports = router;
