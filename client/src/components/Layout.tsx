import { FC, PropsWithChildren } from "react";
import Container from "react-bootstrap/Container";

import Header from "./Header";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container>
      <Header />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
