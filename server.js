const express = require("express");
const app = express();
const path = require("path");

const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");

const PORT = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload.single("image"), (req, res) => {
  console.log("file path", req.file.path);
  console.log("req.body", req.body);
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const response = cloudinary.uploader.upload(req.file.path);

  response
    .then((data) => {
      // console.log("cloudinary data > ", data);
      console.log("data.secure_url > ", data.secure_url);
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
