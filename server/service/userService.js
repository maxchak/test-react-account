import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import bcrypt from "bcrypt";

import { UserDTO } from "../dto/UserDTO.js";
import { ApiError } from "../error/ApiError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserService {
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

  updateUserInfo(id, info) {
    const dbData = this.getUsersData();

    if (dbData.users.find((rec) => rec.email === info.email && rec.id !== id)) {
      throw ApiError.badRequest(
        "Пользователь с таким email уже зарегистрирован!"
      );
    }

    if (dbData.users.find((rec) => rec.phone === info.phone && rec.id !== id)) {
      throw ApiError.badRequest(
        "Пользователь с таким номером телефона уже зарегистрирован!"
      );
    }

    let newUserInfo = {};

    this.writeUserData({
      users: dbData.users.map((user) => {
        if (user.id !== id) return user;

        newUserInfo = {
          id,
          ...user,
          ...info,
        };

        return newUserInfo;
      }),
    });

    return new UserDTO(newUserInfo);
  }

  async changePassword(id, data) {
    const { oldPassword, newPassword } = data;

    const dbData = this.getUsersData();
    const password = dbData.users.find((user) => user.id === id)?.password;
    const isPasswordCorrect = await bcrypt.compare(oldPassword, password);

    if (!isPasswordCorrect) {
      throw ApiError.badRequest("Неправильно указан старый пароль!");
    }

    const hashPassword = await bcrypt.hash(newPassword, 3);

    this.writeUserData({
      users: dbData.users.map((user) => {
        if (user.id !== id) return user;

        return {
          ...user,
          password: hashPassword,
        };
      }),
    });

    return { status: 200, message: "Пароль успешно изменен!" };
  }
}

export const userService = new UserService();
