import * as express from "express";
const PeerController = require("../controllers/peerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add-peer", [authMiddleware], PeerController.addPeer);
router.post("/remove-peer", [authMiddleware], PeerController.removePeer);

module.exports = router;
