// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controllers/usersController");
const router = express.Router();

// login
router.get("/", getUsers);

module.exports = router;
