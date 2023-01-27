import { useState, useMemo, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Context } from "../App";
import { signUp } from "../service/authApi";
import { checkEmail } from "../utils/checkEmail";
import { checkPhone } from "../utils/checkPhone";

import InputGroup from "./UI/InputGroup";
import Loader from "./UI/Loader";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = useMemo(() => checkEmail(email), [email]);

  const isPhoneValid = useMemo(() => checkPhone(phone), [phone]);

  const arePasswordsEqual = useMemo(
    () => !!password.trim() && !!password2.trim() && password === password2,
    [password, password2]
  );

  const isFormValid = useMemo(() => {
    return name.trim() && isEmailValid && isPhoneValid && arePasswordsEqual;
  }, [name, isEmailValid, isPhoneValid, arePasswordsEqual]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      setIsLoading(true);

      signUp({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
      })
        .then((userData) => {
          setError("");

          if (user && user.setUser) {
            user.setUser(userData);
            navigate("/me");
          }
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
        icon="fa-solid fa-user"
        errorLabel="Поле не может быть пустым!"
        validationFn={(value) => value.length > 0}
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        type="email"
        placeholder="Email"
        icon="fa-solid fa-envelope"
        errorLabel="Введите корректный email!"
        validationFn={() => isEmailValid}
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setPhone((e.target as HTMLInputElement).value)}
        type="phone"
        placeholder="Номер телефона"
        icon="fa-solid fa-phone"
        errorLabel="Введите корректный номер телефона!"
        validationFn={() => isPhoneValid}
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        type="password"
        placeholder="Пароль"
        icon="fa-solid fa-lock"
        validationFn={(value) => value.length > 3}
        errorLabel="Длина пароля должна быть не меньше 4 символов!"
      ></InputGroup>
      <InputGroup
        onInputChange={(e) =>
          setPassword2((e.target as HTMLInputElement).value)
        }
        type="password"
        placeholder="Повторите пароль"
        icon="fa-solid fa-lock"
        errorLabel="Пароли не совпадают!"
        validationFn={() => arePasswordsEqual}
      ></InputGroup>
      {error && <p className="text-danger mt-4">{error}</p>}
      <Row className="align-items-center mt-3">
        <Col
          className="d-flex align-items-center justify-content-between"
          xs={12}
          md={8}
          lg={5}
        >
          <span>
            Есть аккаунт? <Link to="/login">Войти</Link>
          </span>
          <Button
            className="d-flex align-items-center"
            disabled={!isFormValid || isLoading}
            variant="primary"
            type="submit"
          >
            Регистрация {isLoading && <Loader className="ms-2" />}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegistrationForm;
