const express = require("express");
const {
  createArtist,
  getAllArtists,
  updateArtistById,
  deleteArtistById,
} = require("../controllers/artist");
const router = express.Router();

router.post("/create", createArtist);
router.get("/", getAllArtists);
router.put("/:id", updateArtistById);
router.delete('/:id', deleteArtistById);

module.exports = router;
