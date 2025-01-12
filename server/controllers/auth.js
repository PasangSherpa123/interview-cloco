const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const { createUserDb } = require("../db/user");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const register = [
  body("first_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("First name is required.")
    .escape(),
  body("last_name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Last name is required.")
    .escape(),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value) => {

    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .trim(),
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
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUserDb({
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        dob,
        gender,
        address,
      });
      res.status(201).json({
        message: "User registered successfully!",
        user: user
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the user." });
    }
  },
];

module.exports = {
  register,
};
