const createError = require("http-errors");

// 404 error handler
function notFoundError(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.error = { message: err.message };
  res.status(err.status || 500);

  if (!res.locals.html) {
    //   html response
    res.render("errors", {
      title: "Error Page",
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundError,
  errorHandler,
};
