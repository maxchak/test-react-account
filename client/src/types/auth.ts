export interface IUser {
  name: string;
  email: string;
  phone: string;
  about: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IChangePasswordResponse {
  status: number;
  message: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
