import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { logout } from "../service/authApi";
import { Context } from "../App";

import InputGroup from "./UI/InputGroup";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { user, passwordModal } = useContext(Context);

  const handleLogout = () => {
    logout().then(() => {
      user.setUser && user.setUser(null);
      navigate("/login");
    });
  };

  const showChangePasswordModal = () => {
    passwordModal.setIsVisible && passwordModal.setIsVisible(true);
  };

  return (
    <div>
      {user && (
        <>
          <InputGroup
            inputValue={user.current?.name}
            inputDisabled
            type="text"
            placeholder="Имя"
            icon="fa-solid fa-user"
          ></InputGroup>
          <InputGroup
            inputValue={user.current?.email}
            inputDisabled
            type="email"
            placeholder="Email"
            icon="fa-solid fa-envelope"
          ></InputGroup>
          <InputGroup
            inputValue={user.current?.phone}
            inputDisabled
            type="phone"
            placeholder="Номер телефона"
            icon="fa-solid fa-phone"
          ></InputGroup>
          <Row className="mt-3">
            <Col xs={12} md={8} lg={5}>
              <Form.Group className="mb-3">
                <Form.Label>О себе:</Form.Label>
                <Form.Control
                  disabled
                  as="textarea"
                  rows={6}
                  value={user.current?.about}
                />
              </Form.Group>
            </Col>
          </Row>
          <Link to="/edit">
            <Button variant="warning">
              Редактировать <i className="ps-2 fa-solid fa-pen"></i>
            </Button>
          </Link>
          <Button
            className="mx-2"
            onClick={showChangePasswordModal}
            variant="warning"
          >
            Изменить пароль
            <i className="ps-2 fa-solid fa-lock"></i>
          </Button>
          <Button onClick={handleLogout} variant="danger">
            Выйти{" "}
            <i className="ps-2 fa-solid fa-person-walking-arrow-right"></i>
          </Button>
        </>
      )}
    </div>
  );
};

export default PersonalInfo;
