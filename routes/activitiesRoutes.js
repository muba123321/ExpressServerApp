const express = require("express");
const router = express.Router();
let activities = require("../models/activityModel");
let users = require("../models/userModel");

router.route("/").get((req, res) => {
  const userId = parseInt(req.query.user);

  if (userId) {
    // This function access all public and private activities this user (check in userModel to get an ID) is part of or created by the user. http://localhost:3000/activities?user=ENTER-USER-ID

    const user = users.find((u) => u.id === userId);

    if (!user) return res.status(404).send("User not found");

    const visibleActivities = activities.filter(
      (activity) =>
        activity.privacy === "public" || activity.participants.includes(userId)
    );
    return res.json(visibleActivities);
  }
// This function generates only public activities http://localhost:3000/activities
  const publicActivities = activities.filter(
    (activity) => activity.privacy === "public"
  );
  return res.json(publicActivities);
});

module.exports = router;
