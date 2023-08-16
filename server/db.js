// Import path module
const path = require("path");

// Get the location of database.sqlite file
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

knex.raw("PRAGMA foreign_keys = ON;").then(() => {
  console.log("Foreign Key Check activated.");
});

// Create a table in the database called "classes"
knex.schema
  // Make sure no "classes" table exists
  // before trying to create new
  .hasTable("classes")
  .then((exists) => {
    if (!exists) {
      // If no "classes" table exists
      // create new, with "title", "numeric", "professor" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (class)
      return knex.schema
        .createTable("classes", (table) => {
          table.increments("id").primary();
          table.string("numeric").unique();
          table.string("professor");
          table.string("title");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Classes' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "classes" table
knex
  .select("*")
  .from("classes")
  .then((data) => console.log("Classes:", data))
  .catch((err) => console.log(err));

knex.schema
  .hasTable("assignments")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("assignments", (table) => {
          table.increments("id").primary();
          table.integer("classId").unsigned().notNullable();
          table
            .foreign("classId")
            .references("id")
            .inTable("Classes")
            .onDelete("CASCADE");
          table.string("title");
          table.string("description");
          table.timestamp("dueDate");
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

knex
  .select("*")
  .from("assignments")
  .then((data) => console.log("Assignments:", data))
  .catch((err) => console.log(err));

// Export the database
module.exports = knex;
