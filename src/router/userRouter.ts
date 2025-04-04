import * as express from "express";
const AuthController = require("../controllers/userController");
const router = express.Router();

router.get("/", AuthController.users);

module.exports = router;
