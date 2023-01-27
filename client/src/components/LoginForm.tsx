import { useMemo, useState, useContext, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { checkEmail } from "../utils/checkEmail";
import { login } from "../service/authApi";
import { Context } from "../App";

import InputGroup from "./UI/InputGroup";
import Loader from "./UI/Loader";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = useMemo(() => checkEmail(email), [email]);

  const isFormValid = useMemo(
    () => isEmailValid && password,
    [isEmailValid, password]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      setIsLoading(true);

      login({
        email: email.trim(),
        password: password.trim(),
      })
        .then((userData) => {
          setError("");

          if (user.setUser && user) {
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
        onInputChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        validationFn={() => isEmailValid}
        errorLabel="Введите корректный email!"
        type="email"
        placeholder="Email"
        icon="fa-solid fa-envelope"
      ></InputGroup>
      <InputGroup
        onInputChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        type="password"
        placeholder="Пароль"
        icon="fa-solid fa-lock"
      ></InputGroup>
      {error && <p className="text-danger mt-4">{error}</p>}
      <Row className="mt-3">
        <Col
          className="d-flex align-items-center justify-content-between"
          xs={12}
          md={8}
          lg={5}
        >
          <span>
            Нет аккаунта? <Link to="/signup">Создать аккаунт</Link>
          </span>
          <Button
            className="d-flex align-items-center"
            disabled={!isFormValid || isLoading}
            variant="primary"
            type="submit"
          >
            Войти {isLoading && <Loader className="ms-2" />}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
