const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes")

const app = express();

const port = 3000;

// adding parsing middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// create routes
app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
