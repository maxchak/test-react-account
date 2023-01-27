import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Context } from "../App";
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Регистрация";
  }, []);

  if (user.current) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <h3 className="h3">Регистрация</h3>
      <RegistrationForm />
    </Layout>
  );
};

export default RegistrationPage;
