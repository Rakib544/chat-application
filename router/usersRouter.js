// external imports
const express = require("express");

// internal imports
const { getUsers, addUsers } = require("../controllers/usersController");
const router = express.Router();
const avatarUpload = require("../middlewares/users/avatarUploads");
const {
  assUserValidators,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidators");

// login
router.get("/", getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  assUserValidators,
  addUserValidatorHandler,
  addUsers
);

module.exports = router;
