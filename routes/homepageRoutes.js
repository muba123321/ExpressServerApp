const express = require("express");
const router = express.Router();

let activities = require("../models/activityModel");
let users = require("../models/userModel");

router.get("/",(req, res) => {
  res.render("index", { activities });
});

router.get(
  "/activities/create",(req, res) =>
  res.render("createActivityPage", { users } )
);

module.exports = router;
