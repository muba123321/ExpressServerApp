const express = require("express");
const route = express.Router();
let users = require("../models/userModel");

// Geting all user data
route.get("/", (req, res) => {
  res.json(users);
});

module.exports = route;
