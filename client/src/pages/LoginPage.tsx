import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "../App";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Войти в аккаунт";
  }, []);

  if (user.current) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <h3 className="h3">Вход в личный кабинет</h3>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
