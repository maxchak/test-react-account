import { FC, PropsWithChildren } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalWrapperProps {
  title: string;
  show: boolean;
  isValid?: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const ModalWrapper: FC<PropsWithChildren<ModalWrapperProps>> = ({
  title,
  show,
  isValid,
  onClose,
  onAccept,
  children,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onAccept} disabled={!isValid}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWrapper;
