// Import express
const express = require("express");

// Import classes-controller
const classesRoutes = require("./../controllers/classes-controller.js");

// Create router
const router = express.Router();

// Add route for GET request to retrieve all classes
// In server.js, classes route is specified as '/classes'
// this means that '/all' translates to '/classes/all'
router.get("/all", classesRoutes.classesAll);

router.put("/get", classesRoutes.classGet);

// Add route for POST request to create new class
// In server.js, classes route is specified as '/classes'
// this means that '/create' translates to '/classes/create'
router.post("/create", classesRoutes.classesCreate);

// Add route for PUT request to delete specific class
// In server.js, classes route is specified as '/classes'
// this means that '/delete' translates to '/classes/delete'
router.put("/delete", classesRoutes.classesDelete);

// Add route for PUT request to reset classes list
// In server.js, classes route is specified as '/classes'
// this means that '/reset' translates to '/classes/reset'
router.put("/reset", classesRoutes.classesReset);

// Export router
module.exports = router;
