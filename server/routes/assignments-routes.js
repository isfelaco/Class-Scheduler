const express = require("express");

const assignmentsRoutes = require("../controllers/assignments-controller.js");

const router = express.Router();

router.get("/all", assignmentsRoutes.assignmentsAll);

router.get("/assignments-by-user/:user", assignmentsRoutes.assignmentsByUser);

router.get(
  "/assignments-by-class/:numeric/:user",
  assignmentsRoutes.assignmentsByClass
);

router.post("/create", assignmentsRoutes.assignmentsCreate);

router.delete("/:id", assignmentsRoutes.assignmentsDelete);

router.put("/reset", assignmentsRoutes.assignmentsReset);

module.exports = router;
