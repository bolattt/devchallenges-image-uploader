const express = require("express");
const app = express();
const path = require("path");

const upload = require("./utils/multer");

const PORT = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", upload.single("image"), (req, res) => {
  res.send("filed uploaded");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
