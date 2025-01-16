const { body, validationResult } = require("express-validator");

// const { createUserDb, getUserByEmailDb } = require("../db/user");
const {
  createArtistDb,
  getArtists,
  updateArtistDb,
  deleteArtistDb,
  getAllArtistsDb,
  createArtistsImportDb,
} = require("../db/artist");
const { validateArtistsArray } = require("../middlewares/validateArtistArray");

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

const createArtistImport = [
  validateArtistsArray,
  async (req, res) => {
    const { artists } = req.body;
    // const { name, dob, gender, address, firstReleaseYear, noOfAlbumsRelease } =
    //   req.body;

    console.log(artists);
    try {
      const values = [];
      const placeholders = [];

      // Construct the query dynamically
      artists.forEach((artist, index) => {
        const start = index * 6;
        placeholders.push(
          `($${start + 1}, $${start + 2}, $${start + 3}, $${start + 4}, $${
            start + 5
          }, $${start + 6}, NOW(), NOW())`
        );
        values.push(
          artist.name,
          artist.gender,
          artist.dob,
          artist.address,
          artist.first_release_year,
          artist.no_of_albums_release
        );
      });
      console.log(values);
      console.log(placeholders.join(", "));

      const createdArtists = await createArtistsImportDb({
        placeholder: placeholders.join(", "),
        values,
      });
      console.log(createdArtists);
      res.status(200).json(createdArtists);
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
  const limit = 10;
  const offset = (page - 1) * limit;

  const { artists, totalCount } = await getArtists({ limit, offset });

  res.status(200).json({
    artists,
    totalCount,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(totalCount / limit),
  });
};

const getAllArtistsExport = async (req, res) => {
  const artists = await getAllArtistsDb();

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
  console.log(req.params);
  console.log("id is ", id);
  const deletedArtist = await deleteArtistDb({ id });
  res.status(200).json({
    message: "Artist deleted successfully",
    deletedArtist,
  });
};

module.exports = {
  createArtist,
  createArtistImport,
  getAllArtists,
  getAllArtistsExport,
  updateArtistById,
  deleteArtistById,
};
