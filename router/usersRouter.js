// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const { getUsers } = require("../controllers/usersController");
const router = express.Router();
const avatarUpload = require("../middlewares/users/avatarUploads");

// login
router.get("/", getUsers);

// add user
router.post("/", avatarUpload, [
  check("name").isLength({ min: 1 }).withMessage("Name id required"),
  check("email").isEmail().withMessage("Invalid Email Address"),
]);

module.exports = router;
