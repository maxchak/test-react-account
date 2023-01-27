import { memo, useContext } from "react";
import Nav from "react-bootstrap/Nav";

import { Context } from "../App";

import LinkGroup from "./UI/LinkGroup";

const Header = () => {
  const { user } = useContext(Context);

  return (
    <header className="header py-3">
      <Nav as="nav" className="justify-content-between h5">
        <LinkGroup to="/" variant="outline-dark" activeVariant="dark">
          Главная
        </LinkGroup>
        {user.current ? (
          <LinkGroup to="/me" variant="outline-dark" activeVariant="dark">
            Личный кабинет
          </LinkGroup>
        ) : (
          <div>
            <LinkGroup
              className="me-2"
              to="/login"
              variant="outline-dark"
              activeVariant="dark"
            >
              Войти
            </LinkGroup>
            <LinkGroup to="/signup" variant="outline-dark" activeVariant="dark">
              Регистрация
            </LinkGroup>
          </div>
        )}
      </Nav>
    </header>
  );
};

export default memo(Header);
