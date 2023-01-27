import { useEffect } from "react";

import Layout from "../components/Layout";
import PersonalInfo from "../components/PersonalInfo";
import ChangePasswordModal from "../components/Modal/ChangePasswordModal";

const PersonalAccountPage = () => {
  useEffect(() => {
    document.title = "Личный кабинет";
  }, []);

  return (
    <Layout>
      <h3 className="h3">Личный кабинет</h3>
      <PersonalInfo />
      <ChangePasswordModal />
    </Layout>
  );
};

export default PersonalAccountPage;
