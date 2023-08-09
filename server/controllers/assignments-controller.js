const knex = require("./../db");

exports.assignmentsAll = async (req, res) => {
  knex
    .select("*")
    .from("assignments")
    .then((userData) => {
      console.log("HERE");
      res.json(userData);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving assignments: ${err}`,
      });
    });
};

exports.assignmentsCreate = async (req, res) => {
  knex("Assignments")
    .insert({
      classID: req.body.classID,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
    })
    .then(() => {
      res.json({
        message: `Assignment \'${req.body.title}\' created.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating ${req.body.title} assignment: ${err}`,
      });
    });
};

exports.assignmentsDelete = async (req, res) => {
  knex("Assignments")
    .del()
    .where({ id: req.body.id })
    .then(() => {
      res.json({
        message: `Assignment with id ${req.body.id} deleted.`,
      });
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting id ${req.body.id} assignment: ${err}`,
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
        message: `There was an error resetting assignment list: ${err}.`,
      });
    });
};
