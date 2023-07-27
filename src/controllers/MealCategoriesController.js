const knex = require("../database/knex");

class MealCategoriesController {
  async create(request, response) {
    const { name } = request.body;

    const [category] = await knex("meal_categories").insert({ name });

    response.json(category);
  }

  async index(request, response) {
    const categories = await knex("meal_categories").select();

    response.json(categories);
  }

  async delete(request, response) {
    const { id } = request.params;
    const deletedCategory = await knex("meal_categories")
      .where({ id })
      .delete();
    response.json(deletedCategory);
  }
}

module.exports = MealCategoriesController;
