// Dependencies
const express = require("express");
const PORT = process.env.PORT || 3000
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
// const cors = require("cors");

// Create express app instance.
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webscraper";

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
// app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public/"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});