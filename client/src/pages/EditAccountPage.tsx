import { useEffect } from "react";

import Layout from "../components/Layout";
import EditPersonalInfo from "../components/EditPersonalInfo";

const EditAccountPage = () => {
  useEffect(() => {
    document.title = "Редактировать данные";
  }, []);

  return (
    <Layout>
      <h3 className="h3">Редактировать личную информацию</h3>
      <EditPersonalInfo />
    </Layout>
  );
};

export default EditAccountPage;
