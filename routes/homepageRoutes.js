const express = require("express");
const router = express.Router();

let activities = require("../models/activityModel");

router.get("/",(req, res) => {
  res.render("index", { activities });
});

module.exports = router;
