import axios from "axios";

import $axios from "../axios/axios";
import {
  ILoginRequest,
  ILogoutResponse,
  ISignUpRequest,
  IUserResponse,
} from "../types/auth";

export const login = async (body: ILoginRequest) => {
  const { data } = await $axios.post<IUserResponse>("/auth/login", body);

  localStorage.setItem("ACCESS_TOKEN", data.accessToken);

  return data.user;
};

export const signUp = async (body: ISignUpRequest) => {
  const { data } = await $axios.post<IUserResponse>("/auth/signup", body);

  localStorage.setItem("ACCESS_TOKEN", data.accessToken);

  return data.user;
};

export const logout = async () => {
  try {
    localStorage.removeItem("ACCESS_TOKEN");

    const { data } = await $axios.post<ILogoutResponse>("/auth/logout");

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
    } else {
      console.log((e as Error).message);
    }
  }
};

export const refresh = async () => {
  try {
    const { data } = await $axios.get<IUserResponse>("/auth/refresh");

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data.message);
    } else {
      console.log((e as Error).message);
    }
  }
};
