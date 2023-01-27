import { userService } from "../service/userService.js";

class UserController {
  updateInfo(req, res, next) {
    try {
      const { id } = req.user;

      return res.json(userService.updateUserInfo(id, req.body));
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { id } = req.user;

      return res.json(await userService.changePassword(id, req.body));
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
