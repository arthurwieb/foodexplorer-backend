const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const user_id = request.user.id;

    const ingredients = await knex("ingredients")
      .where({ user_id })
      .groupBy("name");
    return response.json(ingredients);
  }

  async delete(request, response) {
    const { id } = request.params;
    const deletedIngredient = await knex("ingredients").where({ id }).delete();
    return response.json(deletedIngredient);
  }
}

module.exports = IngredientsController;
