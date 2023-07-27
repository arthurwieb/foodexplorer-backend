const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/uploads");

const MealsController = require("../controllers/MealsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);
const mealsRoutes = Router();
const mealsController = new MealsController();

mealsRoutes.use(ensureAuthenticated); //.use means all routes are going to be authenticated
mealsRoutes.post("/", upload.single("image"), mealsController.create);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.delete("/:id", mealsController.delete);
mealsRoutes.get("/", mealsController.index);

module.exports = mealsRoutes;
