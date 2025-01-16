const express = require("express");
const {
  createArtist,
  getAllArtists,
  updateArtistById,
  deleteArtistById,
  getAllArtistsExport,
  createArtistImport,
} = require("../controllers/artist");
const auth = require("../config/auth");
const router = express.Router();

router.post("/create", auth, createArtist);
router.get("/", auth, getAllArtists);
router.get("/export", auth, getAllArtistsExport);
router.post("/create/import", auth, createArtistImport);
router.put("/:id", auth, updateArtistById);
router.delete("/:id", auth, deleteArtistById);

module.exports = router;
