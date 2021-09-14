const People = require("../models/People");

// import external link
const bcrypt = require("bcrypt");

// get users page
function getUsers(req, res, next) {
  res.render("users", {
    title: "Users - Chat Application",
  });
}

// add user
async function addUsers(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new People({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new People({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred",
        },
      },
    });
  }
}

module.exports = { getUsers, addUsers };
