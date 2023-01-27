import axios, { AxiosError } from "axios";

import { IUserResponse } from "../types/auth";
import { AxiosConfigWithRetry } from "../types/axios";
import { API_URL } from "../consts/api";

const $axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$axios.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    "ACCESS_TOKEN"
  )}`;

  return config;
});

// Prevent multiple unauthorized errors
$axios.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !(error.config as AxiosConfigWithRetry)._isRetry
    ) {
      (error.config as AxiosConfigWithRetry)._isRetry = true;

      try {
        const { data } = await axios.get<IUserResponse>(
          API_URL + "/auth/refresh",
          { withCredentials: true }
        );

        localStorage.setItem("ACCESS_TOKEN", data.accessToken);

        return $axios.request(error.config);
      } catch (e) {
        throw e;
      }
    }

    throw error;
  }
);

export default $axios;
