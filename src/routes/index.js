const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const mealsRouter = require("./meals.routes");
const mealsCategoriesRoutes = require("./mealcategories.routes");
const ingredientsRoutes = require("./ingredients.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/meals", mealsRouter);
routes.use("/mealcategories", mealsCategoriesRoutes);
routes.use("/ingredients", ingredientsRoutes);

module.exports = routes;

// const movieNotesRouter = require("./movienotes.routes");
// routes.use("/movienotes", movieNotesRouter);
// Coisas que posso tirar
// const notesRouter = require("./notes.routes");
// const tagsRouter = require("./tags.routes");
//const movieTagsRouter = require("./movietags.routes");
//routes.use("/movietags", movieTagsRouter);
// routes.use("/notes", notesRouter);
// routes.use("/tags", tagsRouter);
