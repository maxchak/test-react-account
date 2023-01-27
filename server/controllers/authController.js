import { authService } from "../service/authService.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const userData = await authService.registration(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.TOKEN_REFRESH_EXP_MS,
        httpOnly: true,
      });

      delete userData.refreshToken;

      return res.status(201).json(userData);
    } catch (e) {
      console.log(e);

      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.TOKEN_REFRESH_EXP_MS,
        httpOnly: true,
      });

      delete userData.refreshToken;

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      authService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logged out" });
    } catch (e) {
      next(e);
    }
  }

  refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = authService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.TOKEN_REFRESH_EXP_MS,
        httpOnly: true,
      });

      delete userData.refreshToken;

      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
