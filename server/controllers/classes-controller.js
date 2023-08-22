const knex = require("./../db");

// gets all classes in database table
exports.classesAll = async (req, res) => {
  knex
    .select("*")
    .from("classes")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving classes`,
        error: err,
      });
    });
};

// gets classes based on user
exports.classesByUser = async (req, res) => {
  knex("Classes")
    .where({ user: req.params.username })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving the classes for this user`,
        error: err,
      });
    });
};

// gets class based on numeric
exports.classGetByNumeric = async (req, res) => {
  knex("Classes")
    .where({ numeric: req.params.numeric })
    .first()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving the class`,
        error: err,
      });
    });
};

// gets class based on id
exports.classGetById = async (req, res) => {
  knex("Classes")
    .where({ id: req.params.id })
    .first()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving the class`,
        error: err,
      });
    });
};

// adds a class to the database table
exports.classesCreate = async (req, res) => {
  knex("Classes")
    .insert({
      numeric: req.body.numeric,
      title: req.body.title,
      professor: req.body.professor,
      user: req.body.user,
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
      res.json({
        message: `There was an error creating ${req.body.numeric} class`,
        error: err,
      });
    });
};

exports.classEdit = async (req, res) => {
  knex("Classes")
    .where({ id: req.body.class.id })
    .update({
      title: req.body.class.title,
      professor: req.body.class.professor,
    })
    .then(() => {
      res.json(`Class with id ${req.body.class.id} updated.`);
    })
    .catch((err) => {
      res.json({
        message: `There was an error editing ${req.body.class.title} class`,
        error: err,
      });
    });
};

// deletes a class from the database table based on its id
exports.classesDelete = async (req, res) => {
  knex("Classes")
    .del()
    .where({ id: req.params.id })
    .then(() => {
      res.json(`Class with id ${req.params.id} and assignments deleted.`);
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting id ${req.params.id} class`,
        error: err,
      });
    });
};

// resets database table; removes all entities
exports.classesReset = async (req, res) => {
  knex
    .select("*")
    .from("classes")
    .truncate()
    .then(() => {
      res.json({ message: "Class list cleared." });
    })
    .catch((err) => {
      res.json({
        message: `There was an error resetting class list`,
        error: err,
      });
    });
};
