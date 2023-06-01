const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config()

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");
app.locals.baseUrl = process.env.BASE_URL
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/notes", noteRoutes);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server started on http://127.0.0.1:8000");
});
