const { body, validationResult } = require("express-validator");
const {
  createMusicDb,
  getMusicsDb,
  updateMusicDb,
  deleteMusicDb,
} = require("../db/music");

const createMusic = [
  body("artistId")
    .isLength({ min: 1 })
    .withMessage("artist Id is required")
    .trim(),
  body("genre")
    .optional()
    .isIn(["rnb", "country", "classic", "rock", "jazz"])
    .withMessage("Genre must be 'rnb', 'country', 'classic', 'rock', 'jazz'."),
  body("albumName")
    .isLength({ min: 3 })
    .withMessage("Album Name is required")
    .trim(),
  body("title").isLength({ min: 3 }).withMessage("Title is required").trim(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { artistId, genre, albumName, title } = req.body;

    try {
      const music = await createMusicDb({
        artistId,
        genre,
        albumName,
        title,
      });
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
  const limit = 10;
  const offset = (page - 1) * limit;

  const { musics, totalCount } = await getMusicsDb({ limit, offset, artistId });
  res.status(200).json({
    musics,
    totalCount,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(totalCount / limit),
  });
};

const updateMusicById = async (req, res) => {
  const { artistId, musicId: id } = req.params;
  const { title, albumName, genre } = req.body;

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
