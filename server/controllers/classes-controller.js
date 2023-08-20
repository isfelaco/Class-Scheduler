// Import database
const knex = require("./../db");

// Retrieve all classes
exports.classesAll = async (req, res) => {
  // Get all classes from database
  knex
    .select("*") // select all records
    .from("classes") // from 'classes' table
    .then((data) => {
      // Send classes extracted from database in response
      res.json(data);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving classes`,
        error: err,
      });
    });
};

exports.classGetByNumeric = async (req, res) => {
  // Get all classes from database
  knex("Classes")
    .where({ numeric: req.params.numeric }) // find correct record based on id
    .first()
    .then((data) => {
      // Send classes extracted from database in response
      res.json(data);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving the class`,
        error: err,
      });
    });
};

exports.classGetById = async (req, res) => {
  // Get all classes from database
  knex("Classes")
    .where({ id: req.params.id }) // find correct record based on id
    .first()
    .then((data) => {
      // Send classes extracted from database in response
      res.json(data);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving the class`,
        error: err,
      });
    });
};

// Create new class
exports.classesCreate = async (req, res) => {
  // Add new class to database
  knex("Classes")
    .insert({
      // insert new record, a class
      numeric: req.body.numeric,
      title: req.body.title,
      professor: req.body.professor,
      user_id: req.body.user_id,
    })
    .then((insertedClass) => {
      knex("Classes")
        .where({ id: insertedClass[0] })
        .first()
        .then((selectedClass) => {
          return res.json(selectedClass);
        });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating ${req.body.numeric} class`,
        error: err,
      });
    });
};

// Remove specific class
exports.classesDelete = async (req, res) => {
  // Find specific class in the database and remove it
  knex("Classes")
    .del()
    .where({ id: req.params.id }) // find correct record based on id
    .then(() => {
      res.json(`Class with id ${req.params.id} and assignments deleted.`);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error deleting id ${req.params.id} class`,
        error: err,
      });
    });
};

// Remove all classes on the list
exports.classesReset = async (req, res) => {
  // Remove all classes from database
  knex
    .select("*") // select all records
    .from("classes") // from 'classes' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: "Class list cleared." });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error resetting class list`,
        error: err,
      });
    });
};
