exports.up = function (knex) {
  return knex.schema.createTable("meal_categories", function (table) {
    table.increments("id");
    table.string("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("meal_categories");
};
