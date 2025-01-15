const express = require("express");
const {
  createArtist,
  getAllArtists,
  updateArtistById,
  deleteArtistById,
} = require("../controllers/artist");
const auth = require("../config/auth");
const router = express.Router();

router.post("/create", auth, createArtist);
router.get("/", auth, getAllArtists);
router.put("/:id", auth, updateArtistById);
router.delete('/:id',auth, deleteArtistById);

module.exports = router;
