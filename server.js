const express = require("express");
const app = express();
const path = require("path");

const upload = require("./utils/multer"); // multer
const cloudinary = require("./utils/cloudinary");
const { time } = require("console");
const { setTimeout } = require("timers");

const PORT = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload.single("image"), (req, res) => {
  console.log("file path", req.file.path);
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log("url", url);
  const response = cloudinary.uploader.upload(req.file.path);

  response
    .then((data) => {
      // console.log("cloudinary data > ", data);
      console.log("data.secure_url > ", data.secure_url);
      // res.render("complete", { url: data.secure_url });

      res.send({ url: url + `complete?url=${data.secure_url}` });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/complete", (req, res) => {
  res.render("complete", { url: req.query.url });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
