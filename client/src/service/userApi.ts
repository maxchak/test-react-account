import $axios from "../axios/axios";
import {
  IChangePasswordRequest,
  IChangePasswordResponse,
  IUser,
} from "../types/auth";

export const updateUserInfo = async (body: IUser) => {
  const { data } = await $axios.patch<IUser>("/user", body);

  return data;
};

export const changePassword = async (
  body: IChangePasswordRequest
): Promise<IChangePasswordResponse> => {
  const { data } = await $axios.patch("/user/change_password", body);

  return data;
};
