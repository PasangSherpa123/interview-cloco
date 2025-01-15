const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");
const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUsers);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

module.exports = router;
