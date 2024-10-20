const express = require("express");
const router = express.Router();
const tasKApi = require("./task.api");
const userApi = require("./user.api")

router.use("/tasks", tasKApi);
router.use("/user", userApi);

module.exports = router;
