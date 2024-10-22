const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller')

router.post("/",userController.createUser);
router.post("/login",userController.loginWithEmail)
router.get("/me", verifyToken, userController.getCurrentUser);

module.exports = router;
