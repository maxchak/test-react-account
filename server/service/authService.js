import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import bcrypt from "bcrypt";
import { v4 } from "uuid";

import { ApiError } from "../error/ApiError.js";
import { UserDTO } from "../dto/UserDTO.js";

import { tokenService } from "./tokenService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AuthService {
  getUsersData() {
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../db/users.json"), {
        encoding: "utf8",
        flag: "r",
      })
    );
  }

  writeUserData(data) {
    fs.writeFileSync(
      path.resolve(__dirname, "../db/users.json"),
      JSON.stringify(data)
    );
  }

  async registration({ name, email, phone, password }) {
    const dbData = this.getUsersData();

    if (dbData.users.find((rec) => rec.email === email)) {
      throw ApiError.badRequest(
        "Пользователь с таким email уже зарегистрирован!"
      );
    }

    if (dbData.users.find((rec) => rec.phone === phone)) {
      throw ApiError.badRequest(
        "Пользователь с таким телефоном уже зарегистрирован!"
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = {
      id: v4(),
      name,
      phone,
      email,
      about: "",
      password: hashPassword,
    };

    dbData.users.push(user);

    this.writeUserData(dbData);

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const dbData = this.getUsersData();
    const user = dbData.users.find((user) => user.email === email);

    if (!user) {
      throw ApiError.badRequest("Пользователей с таким email нет!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw ApiError.badRequest("Неправильный пароль!");
    }

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  logout(refreshToken) {
    return tokenService.removeToken(refreshToken);
  }

  refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized("Bad token");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const foundToken = tokenService.findToken(refreshToken);

    if (!foundToken) {
      throw ApiError.unauthorized("Bad token");
    }

    const dbData = this.getUsersData();
    const user = dbData.users.find((user) => user.id === userData.id);
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const authService = new AuthService();
