const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activitiesRoutes");
const homepageRoutes = require("./routes/homepageRoutes");
const morgan = require("morgan");

const app = express();

const port = 3000;

// adding parsing middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Logging Request data middleware
app.use(morgan("dev"));

// static files (for CSS and if possible images, etc.)
app.use(express.static("public"));

// setting up Ejs as the view engine
app.set("view engine", "ejs");

// create route
app.use("/", homepageRoutes);
app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

// App Error Handling middleware...
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
    error: err,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
