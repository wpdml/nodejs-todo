const express = require("express");
const router = express.Router();
const tasKApi = require("./task.api");

router.use("/tasks", tasKApi);

module.exports = router;
