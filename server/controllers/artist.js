const { body, validationResult } = require("express-validator");

// const { createUserDb, getUserByEmailDb } = require("../db/user");
const {
  createArtistDb,
  getArtists,
  updateArtistDb,
  deleteArtistDb,
} = require("../db/artist");

const createArtist = [
  body("name")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Artist Name is required.")
    .escape(),
  body("gender")
    .optional()
    .isIn(["m", "f", "o"])
    .withMessage('Gender must be "m", "f", or "o".'),
  body("address")
    .isLength({ min: 3 })
    .withMessage("Address is required")
    .trim(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { name, dob, gender, address, firstReleaseYear, noOfAlbumsRelease } =
      req.body;

    try {
      const artist = await createArtistDb({
        name,
        dob,
        gender,
        address,
        firstReleaseYear,
        noOfAlbumsRelease,
      });
      res.status(201).json({
        message: "Artist created successfully!",
        artist: artist,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the artist." });
    }
  },
];

const getAllArtists = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 12;
  const offset = (page - 1) * limit;

  const artists = await getArtists(limit, offset);
  res.status(200).json(artists);
};

const updateArtistById = async (req, res) => {
  const { id } = req.params;
  const { name, dob, gender, address, firstReleaseYear, noOfAlbumsRelease } =
    req.body;

  const artist = await updateArtistDb({
    name,
    dob,
    gender,
    address,
    firstReleaseYear,
    noOfAlbumsRelease,
    id,
  });
  res.status(200).json({
    message: "Artist updated successfully",
    artist,
  });
};
const deleteArtistById = async (req, res) => {
  const { id } = req.params;
  const deletedArtist = await deleteArtistDb({ id });
  res.status(200).json({
    message: "Artist deleted successfully",
    deletedArtist,
  });
};

module.exports = {
  createArtist,
  getAllArtists,
  updateArtistById,
  deleteArtistById,
};
