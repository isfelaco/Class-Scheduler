const knex = require("./../db");

// gets all users from database table
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

// gets user by username and password
exports.usersGet = async (req, res) => {
  knex("Users")
    .where({ username: req.params.username, password: req.params.password }) // find correct record based on id
    .first()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: `There was an error retrieving the user`,
        error: err,
      });
    });
};

// adds a user to the database table
exports.usersCreate = async (req, res) => {
  knex("Users")
    .insert({
      username: req.body.username,
      password: req.body.password,
    })
    .then((insertedUser) => {
      knex("Users")
        .where({ username: insertedUser[0] })
        .first()
        .then((selectedUser) => {
          return res.json(selectedUser);
        });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating ${req.body.username} user`,
        error: err,
      });
    });
};
