const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");
const auth = require("../config/auth");
const router = express.Router();

router.post("/create", auth, createUser);
router.get("/", auth, getAllUsers);
router.put("/:userId", auth, updateUserById);
router.delete("/:userId", auth, deleteUserById);

module.exports = router;
