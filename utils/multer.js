const multer = require("multer");
const path = require("path");

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

const upload = multer({ storage: storage });

module.exports = upload;