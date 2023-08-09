const express = require("express");

const assignmentsRoutes = require("../controllers/assignments-controller.js");

const router = express.Router();

router.get("/all", assignmentsRoutes.assignmentsAll);

router.post("/create", assignmentsRoutes.assignmentsCreate);

router.put("/delete", assignmentsRoutes.assignmentsDelete);

router.put("/reset", assignmentsRoutes.assignmentsReset);

module.exports = router;
