const knex = require("knex")(config);

knex.schema
  .dropDatabase()
  .then(() => {
    console.log("Database dropped successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error dropping database:", err);
    process.exit(1);
  });
