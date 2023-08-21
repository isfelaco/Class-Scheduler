const express = require("express");

const classesRoutes = require("./../controllers/classes-controller.js");

const router = express.Router();

router.get("/all", classesRoutes.classesAll);

router.get("/classes-by-user/:username", classesRoutes.classesByUser);

router.get("/class-by-numeric/:numeric", classesRoutes.classGetByNumeric);

router.get("/class-by-id/:id", classesRoutes.classGetById);

router.delete("/:id", classesRoutes.classesDelete);

router.post("/create", classesRoutes.classesCreate);

router.put("/reset", classesRoutes.classesReset);

module.exports = router;
