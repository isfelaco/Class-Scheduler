const knex = require("./../db");

// gets all assignments in database table
exports.assignmentsAll = async (req, res) => {
  knex
    .select("*")
    .from("assignments")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving assignments`,
        error: err,
      });
    });
};

// gets assignments based on user
exports.assignmentsByUser = async (req, res) => {
  knex("Assignments")
    .where({ user: req.params.user })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving the assignments for this user`,
        error: err,
      });
    });
};

// gets assignments based on class and user
exports.assignmentsByClass = async (req, res) => {
  knex("Assignments")
    .where({ class_numeric: req.params.numeric, user: req.params.user })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving assignments for this class and user`,
        error: err,
      });
    });
};

// adds an assignment to the database table
exports.assignmentsCreate = async (req, res) => {
  knex("Assignments")
    .insert({
      class_numeric: req.body.class_numeric,
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      user: req.body.user,
    })
    .then((insertedAssignment) => {
      // return the created assignment object
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

// deletes an assignment from the database table based on its id
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

// resets database table; removes all entries
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
