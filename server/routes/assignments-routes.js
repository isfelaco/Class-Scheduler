const express = require("express");

const assignmentsRoutes = require("../controllers/assignments-controller.js");

const router = express.Router();

router.get("/all", assignmentsRoutes.assignmentsAll);

router.put("/some", assignmentsRoutes.assignmentsSome);

router.post("/create", assignmentsRoutes.assignmentsCreate);

router.delete("/:id", assignmentsRoutes.assignmentsDelete);

router.put("/reset", assignmentsRoutes.assignmentsReset);

module.exports = router;
