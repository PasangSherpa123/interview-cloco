const { body, validationResult } = require("express-validator");

// const { createUserDb, getUserByEmailDb } = require("../db/user");
const { createArtistDb} = require('../db/artist');

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
    const {
      name, 
      dob, 
      gender,
      address,
      firstReleaseYear,
      noOfAlbumsRelease,
    } = req.body;

    try {
      const artist = await createArtistDb({
        name, dob, gender, address, firstReleaseYear, noOfAlbumsRelease
      });
      res.status(201).json({
        message: "Artist created successfully!",
        artist: artist
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the artist." });
    }
  },
];

module.exports = {
  createArtist,
};
