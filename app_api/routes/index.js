const express = require("express"); //Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");

// Define the routes for our trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList) // Get Method routes tripList
  .post(tripsController.tripsAddTrip); // Post Method Adds a Trip

// GET Method routes tripsFindByCode - require parameter
// PUT Method routes tripsUpdateTrip - require parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
