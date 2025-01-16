const express = require("express");
const {
  createMusic,
  getAllMusic,
  updateMusicById,
  deleteMusicById,
} = require("../controllers/music");
const auth = require("../config/auth");
const router = express.Router();

router.post("/create", auth, createMusic);
router.get("/:artistId", auth, getAllMusic);
router.put("/:artistId/:musicId", auth, updateMusicById);
router.delete("/:musicId", auth, deleteMusicById);

module.exports = router;
