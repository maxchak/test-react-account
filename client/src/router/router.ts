import {
  EDIT_ACCOUNT_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PERSONAL_ACCOUNT_ROUTE,
  REGISTRATION_ROUTE,
} from "../consts/routes";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import PersonalAccountPage from "../pages/PersonalAccountPage";
import EditAccountPage from "../pages/EditAccountPage";
import NotFoundPage from "../pages/NotFoundPage";

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  },
];

export const authRoutes = [
  {
    path: PERSONAL_ACCOUNT_ROUTE,
    Component: PersonalAccountPage,
  },
  {
    path: EDIT_ACCOUNT_ROUTE,
    Component: EditAccountPage,
  },
];
