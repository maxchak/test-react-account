import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { authRoutes, publicRoutes } from "./router/router";
import { Context } from "./App";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.current &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
