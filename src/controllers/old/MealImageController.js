const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage");
class MealImageController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("meals").where({ id: user_id }).first();

    if (!user) {
      new AppError("meal not found", 404);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFileName);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = MealImageController;
