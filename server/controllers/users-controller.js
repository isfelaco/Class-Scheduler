const knex = require("./../db");

exports.usersAll = async (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving users`,
        error: err,
      });
    });
};

exports.usersGet = async (req, res) => {
  // Get all users from database
  knex("Users")
    .where({ id: req.params.username }, { password: req.params.password }) // find correct record based on id
    .first()
    .then((data) => {
      // Send classes extracted from database in response
      res.json(data);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving the user`,
        error: err,
      });
    });
};

exports.usersCreate = async (req, res) => {
  // Add new user to database
  knex("Users")
    .insert({
      // insert new record, a user
      username: req.body.username,
      password: req.body.password,
    })
    .then((insertedUser) => {
      knex("Users")
        .where({ id: insertedUser[0] })
        .first()
        .then((selectedUser) => {
          return res.json(selectedUser);
        });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating ${req.body.username} user`,
        error: err,
      });
    });
};
