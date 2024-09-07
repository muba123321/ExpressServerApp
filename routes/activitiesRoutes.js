const express = require("express");
const router = express.Router();
let activities = require("../models/activityModel");
let users = require("../models/userModel");
let error = require("../utils/error");

router
  .route("/")
  .get((req, res, next) => {
    const userId = parseInt(req.query.user);

    if (userId) {
      // This function access all public and private activities this user (check in userModel to get an ID) is part of or created by the user. http://localhost:3000/activities?user=ENTER-USER-ID

      const user = users.find((u) => u.id === userId);

      if (!user) return next(error(404, "User not found"));;

      const visibleActivities = activities.filter(
        (activity) =>
          activity.privacy === "public" ||
          activity.participants.includes(userId)
      );
      return res.json(visibleActivities);
    }
    // This function generates only public activities http://localhost:3000/activities
    const publicActivities = activities.filter(
      (activity) => activity.privacy === "public"
    );
    return res.json(publicActivities);
  })
  .post((req, res) => {
    // Make a post request using insomnia or postman or any other API test platforms and pass in the body JSON format the required parameters to the URL http://localhost:3000/activities
    const {
      name,
      description,
      privacy,
      creator,
      participants = [],
      date,
    } = req.body;
    const id = activities.length + 1;
    const newActivity = {
      id,
      name,
      description,
      privacy,
      creator,
      participants,
      date,
    };
    activities.push(newActivity);
    res.status(201).json(newActivity);
  });

router
  .route("/:id")
  .patch((req, res) => {
    // Make a patch request using insomnia or postman or any other API test platforms and pass in the body JSON format the required parameters to the URL http://localhost:3000/activities/ADD-ACTIVITY-ID-HERE

    const activityId = parseInt(req.params.id);
    const activity = activities.find((a) => a.id === activityId);
    if (!activity) return next(error(404, "Acitivity not found"));;
    Object.keys(req.body).forEach((key) => {
      console.log(`${key}: ${activity[key]}`);
      if (key === "participants") {
        activity.participants = Array.isArray(req.body.participants)
          ? [...new Set([...activity.participants, ...req.body.participants])]
          : activity.participants;
      } else {
        activity[key] = req.body[key];
      }
      console.log(`${key}: ${activity[key]}`);
    });
    res.json(activity);
  })
  .delete(
    // Make a delete request using insomnia or postman or any other API test platforms and pass in the URL http://localhost:3000/activities/ADD-ACTIVITY-ID-HERE
    (req, res) => {
      const activityId = parseInt(req.params.id);
      const activityIndex = activities.findIndex((a) => a.id === activityId);
      if (activityIndex === -1)
        return next(error(404, "Activity not found"));
      activities.splice(activityIndex, 1);
      res.status(200).send(`Activity with id ${req.params.id} deleted`);
    }
  );

module.exports = router;
