const express = require("express");
const router = express.Router();
let users = require("../models/userModel");
let error = require("../utils/error");

// Getting all user data using this url http://localhost:3000/users
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  //Creating a new user. ID is generically created no need to pass in ID, only name, age and connections which can be an empty array use Insomnia or Postman or other API test platform 
  .post((req, res) => {
    const { name, age, connections = [] } = req.body;
    const id = users.length + 1;
    const newUser = { id, name, age, connections };
    users.push(newUser);
    res.status(201).json(newUser);
  });

  // Getting only 1 user data using this url http://localhost:3000/users/THE-USERID
router
  .route("/:id")
  .get((req, res, next) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return next(error(404, "User not found"));

    }
    res.json(user);
  })
  // Update user
  .patch((req, res, next) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return next(error(404, "User not found"));

    Object.keys(req.body).forEach((key) => {
      if (key === "connections") {
        user.connections = Array.isArray(req.body.connections)
          ? [...new Set([...user.connections, ...req.body.connections])]
          : user.connections;
      } else {
        user[key] = req.body[key];
      }
    });
    res.json(user);
  })
  // Delete user
  .delete((req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return next(error(404, "User not found"));
    users.splice(userIndex, 1);

    users.forEach((user) => {
      user.connections = user.connections.filter(
        (connectionId) => connectionId !== userId
      );
    });
    res
      .status(200)
      .send(`User with id ${userId} and their connections has been deleted`);
  });

module.exports = router;
