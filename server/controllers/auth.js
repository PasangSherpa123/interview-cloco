const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserDb, getUserByEmailDb } = require("../db/user");

const registerUser = [
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
    .custom(async (value) => {}),
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
        user: user,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the user." });
    }
  },
];
const loginUser = [
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value) => {}),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await getUserByEmailDb(email);

      if (!user) {
        return res.status(403).json({ error: "Wrong email or password!" });
      }
      const samePassword = await bcrypt.compare(password, user.password);
      if (!samePassword) {
        return res.status(403).json({ error: "Wrong password!" });
      }
      const userData = user;
      delete userData.password;
      const jwtPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const jwtData = {
        expiresIn: process.env.JWT_TIMEOUT_DURATION,
        algorithm: "HS256",
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtData);

      res.status(201).json({
        message: "User logged in successfully!",
        user: user,
        token
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while logging the user." });
    }
  },
];

module.exports = {
  registerUser,
  loginUser,
};
