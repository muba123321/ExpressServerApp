const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes")
const activityRoutes = require("./routes/activitiesRoutes");

const app = express();

const port = 3000;

// adding parsing middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// create routes
app.get('/',
    (req, res) => {
        res.send('Welcome to the Home Page')
        }
)
app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
