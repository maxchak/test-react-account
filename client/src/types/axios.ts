import { AxiosRequestConfig } from "axios";

export interface AxiosConfigWithRetry extends AxiosRequestConfig {
  _isRetry: boolean;
}
