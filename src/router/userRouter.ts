import * as express from "express";
const AuthController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", [authMiddleware], AuthController.users);
router.get("/profile", [authMiddleware], AuthController.profile);

module.exports = router;
