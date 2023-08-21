const express = require("express");

const usersRoutes = require("./../controllers/users-controller.js");

const router = express.Router();

router.get("/all", usersRoutes.usersAll);

router.get("/:username/:password", usersRoutes.usersGet);

router.post("/create", usersRoutes.usersCreate);

module.exports = router;
