import { ApiError } from "../error/ApiError.js";
import { tokenService } from "../service/tokenService.js";

export const authMiddleware = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.unauthorized("Unauthorized!"));
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorized("Unauthorized!"));
    }

    req.user = tokenService.validateAccessToken(accessToken);
    next();
  } catch (e) {
    return next(ApiError.unauthorized("Unauthorized!"));
  }
};
