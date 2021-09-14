// external imports
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");
const createError = require("http-errors");

// internal imports

const People = require("../../models/People");

// add user
const assUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already is used");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi Number")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createError("Number already is used");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol"
    ),
];

const addUserValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/upload/avatars/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { assUserValidators, addUserValidatorHandler };
