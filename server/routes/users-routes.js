// Import express
const express = require("express");

// Import classes-controller
const usersRoutes = require("./../controllers/users-controller.js");

// Create router
const router = express.Router();

router.get("/all", usersRoutes.usersAll);

router.get("/:username/:password", usersRoutes.usersGet);

router.post("/create", usersRoutes.usersCreate);

module.exports = router;
