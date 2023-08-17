const knex = require("./../db");

exports.assignmentsAll = async (req, res) => {
  knex
    .select("*")
    .from("assignments")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving assignments`,
        error: err,
      });
    });
};

exports.assignmentsSome = async (req, res) => {
  knex("Assignments")
    .where({ class_numeric: req.body.numeric }) // find correct record based on id
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving assignments`,
        error: err,
      });
    });
};

exports.assignmentsCreate = async (req, res) => {
  knex("Assignments")
    .insert({
      class_numeric: req.body.class_numeric,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    })
    .then((insertedAssignment) => {
      knex("Assignments")
        .where({ id: insertedAssignment[0] })
        .first()
        .then((selectedAssignment) => {
          return res.json(selectedAssignment);
        });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating ${req.body.title} assignment`,
        error: err,
      });
    });
};

exports.assignmentsDelete = async (req, res) => {
  knex("Assignments")
    .del()
    .where({ id: req.params.id })
    .then(() => {
      res.json({
        message: `Assignment with id ${req.params.id} deleted.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting id ${req.params.id} assignment`,
        error: err,
      });
    });
};

exports.assignmentsReset = async (req, res) => {
  knex
    .select("*")
    .from("assignments")
    .truncate()
    .then(() => {
      res.json({ message: "Assignment list cleared." });
    })
    .catch((err) => {
      res.json({
        message: `There was an error resetting assignment list`,
        error: err,
      });
    });
};
