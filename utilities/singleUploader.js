const multer = require("multer");
const { createError } = require("../middlewares/common/errorHandler");

function uploader(subtotal_path, allowed_file_types, max_file_size, error_msg) {
  const UPLOAD_FOLDERS = `${__dirname}/../public/uploads/${subtotal_path}/`;

  //   prepare storage for file upload
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, UPLOAD_FOLDERS);
    },
    filename: (req, res, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowercase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, filename, fileExt);
    },
  });

  //   prepare the final multer upload object

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, res, cb) => {
      if (allowed_file_types.includes(file.mimeType)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  return upload;
}

module.exports = uploader;
