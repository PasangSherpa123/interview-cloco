const express = require("express");
const { createMusic, getAllMusic, updateMusicById, deleteMusicById } = require("../controllers/music");
const router = express.Router();

router.post("/create", createMusic);
router.get("/:artistId", getAllMusic);
router.put("/:artistId/:musicId", updateMusicById);
router.delete("/:musicId", deleteMusicById);

module.exports = router;
