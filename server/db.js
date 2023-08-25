const path = require("path");

const dbPath = path.resolve(__dirname, "db/database.sqlite");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// reset tables
// knex.schema.dropTable("classes").then(() => console.log("here"));
// knex.schema.dropTable("assignments").then(() => console.log("here"));
// knex.schema.dropTable("users").then(() => console.log("here"));

knex.raw("PRAGMA foreign_keys = ON;").then(() => {
  console.log("Foreign Key Check activated.");
});

knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("users", (table) => {
          table.string("username").primary();
          table.string("password").notNullable();
        })
        .then(() => {
          console.log("Table 'Users' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("classes")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("classes", (table) => {
          table.increments("id");
          table.string("numeric").notNullable();
          table.string("professor");
          table.string("title");
          table.string("user");
          table
            .foreign("user")
            .references("username")
            .inTable("Users")
            .onDelete("CASCADE");
          table.unique(["numeric", "user"]);
        })
        .then(() => {
          console.log("Table 'Classes' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("assignments")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("assignments", (table) => {
          table.increments("id").primary();
          table.string("class_numeric").notNullable();
          table
            .foreign("user")
            .references("username")
            .inTable("Users")
            .onDelete("CASCADE");
          table.string("title");
          table.string("description");
          table.timestamp("due_date");
          table.string("user").notNullable();
          table
            .foreign("user")
            .references("username")
            .inTable("Users")
            .onDelete("CASCADE");
        })
        .then(() => {
          console.log("Table 'Assignments' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in tables
knex
  .select("*")
  .from("classes")
  .then((data) => console.log("Classes:", data))
  .catch((err) => console.log(err));
knex
  .select("*")
  .from("assignments")
  .then((data) => console.log("Assignments:", data))
  .catch((err) => console.log(err));
knex
  .select("*")
  .from("users")
  .then((data) => console.log("Users:", data))
  .catch((err) => console.log(err));

// knex("classes")
//   .insert({ numeric: "CS 1110", user: "user1" })
//   .then((res) => console.log(res));

module.exports = knex;
