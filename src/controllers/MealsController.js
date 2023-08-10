const { json } = require("express");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class MealsController {
  async create(request, response) {
    const mealData = JSON.parse(request.body.meal);
    const { title, description, category_id, price, ingredients } = mealData;
    const user_id = request.user.id;
    let meal_id;
    let filename;

    if (request.file) {
      const mealImageName = request.file.filename;
      const diskStorage = new DiskStorage();
      filename = await diskStorage.saveFile(mealImageName);
    }

    [meal_id] = await knex("meals").insert({
      title,
      description,
      user_id,
      category_id,
      price,
      image: filename,
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
    //change to showMealByCategory
    const { search, category_id } = request.query;
    const user_id = request.user.id;

    let meals;

    meals = await knex("meals")
      .distinct("meals.*")
      .join("ingredients", "ingredients.meal_id", "meals.id")
      .where("meals.category_id", category_id)
      .andWhere(function () {
        this.where("ingredients.name", "like", `%${search}%`).orWhere(
          "meals.title",
          "like",
          `%${search}%`
        );
      });
    const mealsByCategory = {};

    meals.forEach((meal) => {
      const { category_id, ...rest } = meal;

      if (!mealsByCategory[category_id]) {
        mealsByCategory[category_id] = [];
      }

      mealsByCategory[category_id].push(rest);
    });

    const userIngredients = await knex("ingredients");
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

  async update(request, response) {
    const meal = JSON.parse(request.body.meal);
    const { title, description, price, ingredients, category_id } = meal;
    const meal_id = request.params.id;
    const user_id = request.user.id;

    let filename;

    if (request.file) {
      const mealImageName = request.file.filename;
      const diskStorage = new DiskStorage();
      filename = await diskStorage.saveFile(mealImageName);
    }

    await knex("ingredients").where("meal_id", meal_id).del();

    const ingredientsInsert = ingredients.map((name) => {
      return {
        meal_id,
        name,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    await knex("meals")
      .where("id", meal_id)
      .update({ title, image: filename, description, price, category_id });

    return response.json();
  }
}

module.exports = MealsController;
