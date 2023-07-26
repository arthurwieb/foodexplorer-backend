exports.up = (knex) =>
  knex.schema.createTable("meals", (table) => {
    table.increments("id");
    table.text("title");
    table.text("image");
    table.integer("user_id").references("id").inTable("users");
    table.text("description");
    table.integer("category_id").references("id").inTable("meal_categories");
    table.float("price");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("meals");
