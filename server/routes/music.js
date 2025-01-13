const express = require("express");
const { createMusic, getAllMusic } = require("../controllers/music");
const router = express.Router();

router.post("/create", createMusic);
router.get("/:artistId", getAllMusic);

module.exports = router;
