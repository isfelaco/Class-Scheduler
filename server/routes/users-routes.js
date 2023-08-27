const express = require("express");

const usersRoutes = require("./../controllers/users-controller.js");

const router = express.Router();

router.get("/all", usersRoutes.usersAll);

router.get("/:username/:password", usersRoutes.userGet);

router.post("/create", usersRoutes.userCreate);

router.post("/login", usersRoutes.userLogin);

module.exports = router;
