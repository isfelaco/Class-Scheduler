// Import database
const knex = require("./../db");

// Retrieve all classes
exports.classesAll = async (req, res) => {
  // Get all classes from database
  knex
    .select("*") // select all records
    .from("classes") // from 'classes' table
    .then((userData) => {
      // Send classes extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving classes: ${err}` });
    });
};

// Create new class
exports.classesCreate = async (req, res) => {
  // Add new class to database
  console.log(req);
  knex("Classes")
    .insert({
      // insert new record, a class
      numeric: req.body.numeric,
      title: req.body.title,
      professor: req.body.professor,
    })
    .then(() => {
      // Send a success message in response
      res.json({
        message: `Class \'${req.body.numeric}\' created.`,
      });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating ${req.body.numeric} class: ${err}`,
      });
    });
};

// Remove specific class
exports.classesDelete = async (req, res) => {
  // Find specific class in the database and remove it
  knex("Classes")
    .del()
    .where({ id: req.body.id }) // find correct record based on id
    .then(() => {
      // console.log("here", res);
      // Send a success message in response
      res.json({
        message: `Class with id ${req.body.id} deleted.`,
        idk: `${res}`,
      });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error deleting id ${req.body.id} class: ${err}`,
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
      res.json({ message: `There was an error resetting class list: ${err}.` });
    });
};
