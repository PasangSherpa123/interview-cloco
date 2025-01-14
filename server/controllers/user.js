const { body, validationResult } = require("express-validator");
const {
  createMusicDb,
  getMusicsDb,
  updateMusicDb,
  deleteMusicDb,
} = require("../db/music");
const {
  createUserDb,
  getUsersDb,
  getUserByEmailDb,
  getUserByPhoneDb,
  updateUserDb,
  deleteUserDb,
} = require("../db/user");

const createUser = [
  body("first_name")
    .isLength({ min: 3 })
    .withMessage("First Name is required")
    .trim(),
  body("last_name")
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
      const { first_name, last_name, email, phone, dob, gender, address } =
        req.body;
      const checkUser = await getUserByEmailDb(email);
      if (checkUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
      const checkUserByPhone = await getUserByPhoneDb(phone);
      if (checkUserByPhone) {
        return res
          .status(400)
          .json({ message: "User with this phone already exists" });
      }
      const user = await createUserDb({
        first_name,
        last_name,
        email,
        hashedPassword: "",
        phone,
        dob,
        gender,
        address,
      });
      res.status(201).json({
        message: "User created successfully!",
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

const getAllUsers = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 12;
  const offset = (page - 1) * limit;

  const users = await getUsersDb(limit, offset);
  res.status(200).json(users);
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { first_name, last_name, dob, gender, address } = req.body;

  const user = await updateUserDb({
    first_name,
    last_name,
    dob,
    gender,
    address,
    id: userId,
  });
  res.status(200).json({
    message: "User updated successfully",
    user,
  });
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await deleteUserDb({
    id: userId,
  });
  res.status(200).json({
    message: "User deleted successfully",
    user,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
