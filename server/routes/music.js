const express = require("express");
const { createMusic, getAllMusic, updateMusicById } = require("../controllers/music");
const router = express.Router();

router.post("/create", createMusic);
router.get("/:artistId", getAllMusic);
router.put("/:artistId/:musicId", updateMusicById)

module.exports = router;
