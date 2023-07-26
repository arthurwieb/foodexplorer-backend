const { Router } = require("express");

const MealsController = require("../controllers/MealsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();
const mealsController = new MealsController();

console.log("meals routes");
mealsRoutes.use(ensureAuthenticated);
mealsRoutes.post("/", mealsController.create);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.delete("/:id", mealsController.delete);
mealsRoutes.get("/", mealsController.index);

module.exports = mealsRoutes;
