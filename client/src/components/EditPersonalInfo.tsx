import { FormEvent, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Context } from "../App";
import { checkEmail } from "../utils/checkEmail";
import { checkPhone } from "../utils/checkPhone";
import { updateUserInfo } from "../service/userApi";

import InputGroup from "./UI/InputGroup";

const EditPersonalInfo = () => {
  const { user } = useContext(Context);

  const [name, setName] = useState(() => user.current?.name || "");
  const [email, setEmail] = useState(() => user.current?.email || "");
  const [phone, setPhone] = useState(() => user.current?.phone || "");
  const [about, setAbout] = useState(() => user.current?.about || "");
  const [btnName, setBtnName] = useState("Сохранить");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = useMemo(() => checkEmail(email), [email]);
  const isPhoneValid = useMemo(() => checkPhone(phone), [phone]);

  const formWasChanged = useMemo(() => {
    return !(
      name.trim() === user.current?.name &&
      email.trim() === user.current?.email &&
      phone.trim() === user.current?.phone &&
      about.trim() === user.current?.about
    );
  }, [name, email, phone, about, user]);

  const isFormValid = useMemo(
    () => name && isEmailValid && isPhoneValid,
    [name, isEmailValid, isPhoneValid]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      setIsLoading(true);

      updateUserInfo({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        about: about.trim(),
      })
        .then((userData) => {
          setError("");

          user.setUser && user.setUser(userData);

          setBtnName("Сохранено!");

          setTimeout(() => {
            setBtnName("Сохранить");
          }, 1000);
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            setError(e.response?.data.message);
          } else {
            setError(e.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup
        onInputChange={(e) => setName((e.target as HTMLInputElement).value)}
        type="text"
        placeholder="Имя"
        inputValue={name}
        icon="fa-solid fa-user"
        errorLabel="Поле не может быть пустым!"
        validationFn={(value) => value.length > 0}
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        type="email"
        placeholder="Email"
        inputValue={email}
        icon="fa-solid fa-envelope"
        errorLabel="Введите корректный email!"
        validationFn={() => isEmailValid}
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setPhone((e.target as HTMLInputElement).value)}
        type="phone"
        placeholder="Номер телефона"
        inputValue={phone}
        icon="fa-solid fa-phone"
        errorLabel="Введите корректный номер телефона!"
        validationFn={() => isPhoneValid}
      ></InputGroup>
      <Row className="mt-3">
        <Col xs={12} md={8} lg={5}>
          <Form.Group className="mb-3">
            <Form.Label>О себе:</Form.Label>
            <Form.Control
              value={about}
              as="textarea"
              rows={6}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      {error && <p className="text-danger">{error}</p>}
      <Link to="/me">
        <Button className="me-2" variant="danger">
          Отмена
        </Button>
      </Link>
      <Button
        type="submit"
        variant="success"
        disabled={!isFormValid || !formWasChanged || isLoading}
      >
        {btnName}{" "}
        {btnName === "Сохранить" ? (
          <i className="ps-2 fa-solid fa-floppy-disk"></i>
        ) : (
          <i className="ps-2 fa-solid fa-check"></i>
        )}
      </Button>
    </Form>
  );
};

export default EditPersonalInfo;
