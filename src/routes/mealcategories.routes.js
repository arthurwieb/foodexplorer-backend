const { Router } = require("express");

const MealCategoriesController = require("../controllers/MealCategoriesController");
// const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsCategoriesRoutes = Router();
const mealCategoriesController = new MealCategoriesController();

//mealsRoutes.use(ensureAuthenticated); //.use means all routes are going to be authenticated
mealsCategoriesRoutes.post("/", mealCategoriesController.create);
mealsCategoriesRoutes.get("/", mealCategoriesController.index);
mealsCategoriesRoutes.delete("/:id", mealCategoriesController.delete);
//mealsCategoriesRoutes.get("/:id", mealCategoriesController.show);

module.exports = mealsCategoriesRoutes;
