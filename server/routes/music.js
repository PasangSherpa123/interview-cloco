const express = require("express");
const { createMusic } = require("../controllers/music");
const router = express.Router();

router.post("/create", createMusic);

module.exports = router;
