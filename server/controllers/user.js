const { body, validationResult } = require("express-validator");
const {
  createMusicDb,
  getMusicsDb,
  updateMusicDb,
  deleteMusicDb,
} = require("../db/music");

const createUser = [
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("First Name is required")
    .trim(),
  body("lastName")
    .isLength({ min: 3 })
    .withMessage("Last Name is required")
    .trim(),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value) => {}),
  body("phone")
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone number must be between 10 and 20 characters.")
    .isNumeric()
    .withMessage("Phone number must be numeric.")
    .trim(),
  body("gender")
    .optional()
    .isIn(["m", "f", "o"])
    .withMessage('Gender must be "m", "f", or "o".'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {

    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        dob,
        gender,
        address,
      } = req.body;
      res.status(201).json({
        message: "Music created successfully!",
        music: music,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the artist." });
    }
  },
];

const getAllMusic = async (req, res) => {
  const { page = 1 } = req.query;
  const { artistId } = req.params;
  const limit = 12;
  const offset = (page - 1) * limit;
  console.log(artistId);

  const artists = await getMusicsDb({ limit, offset, artistId });
  res.status(200).json(artists);
};

const updateMusicById = async (req, res) => {
  const { artistId, musicId: id } = req.params;
  const { title, albumName, genre } = req.body;
  console.log({ title, albumName, genre });

  const music = await updateMusicDb({
    artistId,
    title,
    albumName,
    genre,
    id,
  });
  res.status(200).json({
    message: "Music updated successfully",
    music,
  });
};

const deleteMusicById = async (req, res) => {
  console.log(req.params);
  const { musicId } = req.params;
  console.log(musicId);

  const music = await deleteMusicDb({
    id: musicId,
  });
  res.status(200).json({
    message: "Music deleted successfully",
    music,
  });
};

module.exports = {
  createMusic,
  getAllMusic,
  updateMusicById,
  deleteMusicById,
};
