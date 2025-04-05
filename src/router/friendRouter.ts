import * as express from "express";
const FriendController = require("../controllers/friendController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-friend", [authMiddleware], FriendController.friendUser);
router.post("/unfriend", [authMiddleware], FriendController.unFriendUser);

module.exports = router;
