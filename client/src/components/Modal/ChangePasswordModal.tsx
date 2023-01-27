import { useContext, useMemo, useState } from "react";
import axios from "axios";

import InputGroup from "../UI/InputGroup";
import { Context } from "../../App";
import { changePassword } from "../../service/userApi";

import ModalWrapper from "./ModalWrapper";

const ChangePasswordModal = () => {
  const { passwordModal } = useContext(Context);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const arePasswordsEqual = useMemo(
    () => newPassword === newPassword2,
    [newPassword, newPassword2]
  );

  const isFormValid = useMemo(
    () => newPassword.length > 3 && oldPassword.length > 3 && arePasswordsEqual,
    [oldPassword, arePasswordsEqual, newPassword]
  );

  const clearModal = () => {
    setOldPassword("");
    setNewPassword("");
    setNewPassword2("");
    setError("");
    setSuccess("");
  };

  const onClose = () => {
    clearModal();
    passwordModal.setIsVisible && passwordModal.setIsVisible(false);
  };

  const onAccept = () => {
    setIsLoading(true);

    if (isFormValid) {
      changePassword({ newPassword, oldPassword })
        .then((res) => {
          clearModal();

          if (res.status === 200) {
            setError("");
            setSuccess(res.message);
          } else {
            setSuccess("");
            setError(res.message);
          }

          setTimeout(() => {
            onClose();
            setError("");
            setSuccess("");
          }, 1500);
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
    <ModalWrapper
      show={passwordModal.isVisible}
      title="Изменение пароля"
      onClose={onClose}
      onAccept={onAccept}
      isValid={isFormValid || isLoading}
    >
      <InputGroup
        onInputChange={(e) =>
          setOldPassword((e.target as HTMLInputElement).value)
        }
        type="password"
        placeholder="Старый пароль"
        inputValue={oldPassword}
        icon="fa-solid fa-lock"
        errorLabel="Длина старого пароля не могла быть менее 3 символов!"
        validationFn={(value) => value.length > 3}
        isNotAdaptive
      ></InputGroup>
      <InputGroup
        onInputChange={(e) =>
          setNewPassword((e.target as HTMLInputElement).value)
        }
        type="password"
        placeholder="Новый пароль"
        inputValue={newPassword}
        icon="fa-solid fa-lock"
        errorLabel="Длина пароля не может быть менее 4 символов!"
        validationFn={(value) => value.length > 3}
        isNotAdaptive
      ></InputGroup>
      <InputGroup
        onInputChange={(e) =>
          setNewPassword2((e.target as HTMLInputElement).value)
        }
        type="password"
        label="Повторите пароль"
        placeholder="Пароль"
        inputValue={newPassword2}
        icon="fa-solid fa-lock"
        errorLabel="Пароли не совпадают!"
        validationFn={(value) => value.length > 3}
        isNotAdaptive
      ></InputGroup>
      {error && <p className="text-danger mt-4">{error}</p>}
      {success && <p className="text-success mt-4">{success}</p>}
    </ModalWrapper>
  );
};

export default ChangePasswordModal;
