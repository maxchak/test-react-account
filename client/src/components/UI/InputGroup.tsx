import {
  FC,
  HTMLInputTypeAttribute,
  ChangeEvent,
  FocusEvent,
  useState,
} from "react";
import { default as IG } from "react-bootstrap/InputGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Input from "./Input";

interface InputGroupProps {
  type: HTMLInputTypeAttribute;
  onInputChange?: (e: ChangeEvent) => void;
  inputValue?: string;
  inputDisabled?: boolean;
  placeholder?: string;
  label?: string;
  icon?: string;
  validationFn?: (s: string) => boolean;
  errorLabel?: string;
  isNotAdaptive?: boolean;
}

const InputGroup: FC<InputGroupProps> = ({
  type,
  placeholder,
  inputValue,
  label,
  errorLabel,
  icon,
  inputDisabled,
  validationFn,
  onInputChange,
  isNotAdaptive,
}) => {
  const [isValid, setIsValid] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(true);

    if (onInputChange) {
      onInputChange(e);
    }
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (validationFn) {
      setIsValid(validationFn(e.target.value));
    }
  };

  const innerValue = (
    <>
      <FormLabel className="col-6 px-0 mt-3">{label ?? placeholder}:</FormLabel>
      <IG className="px-0">
        {icon && (
          <IG.Text id="basic-addon1">
            <i className={icon}></i>
          </IG.Text>
        )}
        <Input
          disabled={inputDisabled}
          value={inputValue}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </IG>
      {!isValid && <p className="text-danger m-0">{errorLabel}</p>}
    </>
  );

  return (
    <Row>
      {isNotAdaptive ? (
        <Col>{innerValue}</Col>
      ) : (
        <Col xs={12} md={8} lg={5}>
          {innerValue}
        </Col>
      )}
    </Row>
  );
};

export default InputGroup;
