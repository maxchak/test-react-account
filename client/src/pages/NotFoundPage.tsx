import { useEffect } from "react";

import Layout from "../components/Layout";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404";
  }, []);

  return (
    <Layout>
      <p className="text-center display-2">404</p>
      <p className="text-center h6">Страница не найдена!</p>
    </Layout>
  );
};

export default NotFoundPage;
