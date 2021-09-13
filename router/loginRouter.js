// external imports
const express = require("express");

// internal imports
const { getLogin } = require("../controllers/loginController");
const router = express.Router();

// login
router.get("/", getLogin);

module.exports = router;
