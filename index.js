const express = require('express');
const app = express();
const port = 3010;
let cors = require('cors');
app.use(cors());
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];
function addActivity(activityId, type, duration, caloriesBurned) {
  let newActivity = {
    activityId: activityId,
    type: type,
    duration: duration,
    caloriesBurned: caloriesBurned,
  };
  activities.push(newActivity);
  return activities;
}
app.get('/activities/add', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseFloat(req.query.caloriesBurned);
  let result = addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: result });
});
function sortActivityByDuration(dur1, dur2) {
  return dur1.duration - dur2.duration;
}
app.get('/activities/sort-by-duration', (req, res) => {
  let activityCopy = activities.slice();
  activityCopy.sort(sortActivityByDuration);
  res.json({ activities: activityCopy });
});
function filterActivityByType(activityObj, type) {
  return activityObj.type === type;
}
app.get('/activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activityObj) =>
    filterActivityByType(activityObj, type)
  );
  res.json({ activities: result });
});
function calculateCaloriesBurned(activities) {
  let sum = 0;
  for (let i = 0; i < activities.length; i++) {
    sum = sum + activities[i].caloriesBurned;
  }
  return sum;
}
app.get('/activities/total-calories', (req, res) => {
  let result = calculateCaloriesBurned(activities);
  res.json({ activities: result });
});
function updateActivityDurationById(activities, activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
    }
  }
  return activities;
}
app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateActivityDurationById(activities, activityId, duration);
  res.json({ activities: result });
});
function deleteActivityByID(activities, activityId) {
  let result = [];
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId != activityId) {
      result.push(activities[i]);
    }
  }
  return result;
}
app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = deleteActivityByID(activities, activityId);
  res.json({ activities: result });
});
function deleteActivityByType(activities, type) {
  let result = [];
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].type != type) {
      result.push(activities[i]);
    }
  }
  return result;
}
app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  let result = deleteActivityByType(activities, type);
  res.json({ activities: result });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
