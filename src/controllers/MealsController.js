const knex = require("../database/knex");

class MealsController {
  async create(request, response) {
    const { title, description, category_id, price, ingredients } =
      request.body;
    const user_id = request.user.id;

    const [meal_id] = await knex("meals").insert({
      title,
      description,
      user_id,
      category_id,
      price,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        meal_id,
        name,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const meal = await knex("meals").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ meal_id: id })
      .orderBy("name");

    return response.json({
      ...meal,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("meals").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;
    const user_id = request.user.id;

    let meals;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient);

      meals = await knex("ingredients")
        .select(["meals.id", "meals.title", "meals.user_id"])
        .where("meals.user_id", user_id)
        .whereLike("meals.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("meals", "meals.id", "ingredients.meal_id")
        .groupBy("meals.id")
        .orderBy("meals.title");
    } else {
      meals = await knex("meals")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userIngredients = await knex("ingredients").where({ user_id });
    const mealsWithIngredients = meals.map((meal) => {
      const mealIngredients = userIngredients.filter(
        (ingredients) => ingredients.meal_id === meal.id
      );

      return {
        ...meal,
        ingredients: mealIngredients,
      };
    });

    return response.json(mealsWithIngredients);
  }
}

module.exports = MealsController;
