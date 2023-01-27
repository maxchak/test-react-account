import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import jwt from "jsonwebtoken";

import { ApiError } from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TokenService {
  getTokenData() {
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../db/tokens.json"), {
        encoding: "utf8",
        flag: "r",
      })
    );
  }

  writeTokenData(data) {
    fs.writeFileSync(
      path.resolve(__dirname, "../db/tokens.json"),
      JSON.stringify(data)
    );
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.TOKEN_ACCESS_SECRET, {
      expiresIn: process.env.TOKEN_ACCESS_EXP,
    });
    const refreshToken = jwt.sign(payload, process.env.TOKEN_REFRESH_SECRET, {
      expiresIn: process.env.TOKEN_REFRESH_EXP,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_ACCESS_SECRET);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        throw ApiError.unauthorized("Bad token");
      }

      if (e instanceof jwt.TokenExpiredError) {
        throw ApiError.unauthorized("Token expired");
      }

      throw e;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_REFRESH_SECRET);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        throw ApiError.unauthorized("Bad token");
      }

      if (e instanceof jwt.TokenExpiredError) {
        throw ApiError.unauthorized("Token expired");
      }

      throw e;
    }
  }

  saveToken(userId, refreshToken) {
    // Нужен также хранить fingerprint браузера,
    // чтобы можно было быть авторизованным с разных устройств
    const dbData = this.getTokenData();

    const rec = dbData.tokens.find((rec) => rec.id === userId);

    if (rec) {
      rec.refresh = refreshToken;

      return this.writeTokenData(dbData);
    }

    dbData.tokens.push({ id: userId, refresh: refreshToken });

    return this.writeTokenData(dbData);
  }

  removeToken(refreshToken) {
    const dbData = this.getTokenData();

    dbData.tokens = dbData.tokens.filter((rec) => rec.refresh !== refreshToken);
    this.writeTokenData(dbData);
  }

  findToken(token) {
    return this.getTokenData().tokens.find((rec) => rec.refresh === token);
  }
}

export const tokenService = new TokenService();
