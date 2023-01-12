const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3002;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
