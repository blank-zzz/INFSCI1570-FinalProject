require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const { connectDB } = require("./db_connect");

connectDB();
const app = express();

// Set view to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware: handles requests info
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set path for css, js, and images
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
app.use(session({
  secret: "testingkey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


// Define Routes
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/comments", commentRoutes);
app.use("/admin", adminRoutes);


// Start Server / Listen
const listener = app.listen(3000, () => {
    console.log("App running on port " + listener.address().port);
});
