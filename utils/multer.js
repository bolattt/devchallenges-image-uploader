const multer = require("multer");
const path = require("path");

function fileFilter(req, file, cb) {
  if (file.mimetype !== "image/png") {
    return cb(new Error("Something went wrong"), false);
  }
  cb(null, true);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    console.log("multer file", file);
    const format = path.extname(file.originalname);
    console.log(format);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 10) + format;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
