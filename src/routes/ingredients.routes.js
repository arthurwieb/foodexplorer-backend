const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();
ingredientsRoutes.use(ensureAuthenticated); //.use means all routes are going to be authenticated

ingredientsRoutes.get("/", ingredientsController.index);

module.exports = ingredientsRoutes;
