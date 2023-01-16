const express = require("express");
const app = express();
const path = require("path");

const upload = require("./utils/multer"); // multer
const cloudinary = require("./utils/cloudinary");

const PORT = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file.path);

  const response = cloudinary.uploader.upload(req.file.path);

  response
    .then((data) => {
      console.log(data);
      console.log("data.secure_url", data.secure_url);
      res.render("complete", { url: data.secure_url });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/drop", (req, res) => {
  console.log(req);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
