import { FC, HTMLInputTypeAttribute, ChangeEvent, FocusEvent } from "react";
import FormControl from "react-bootstrap/FormControl";

interface InputProps {
  type: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Input: FC<InputProps> = (props) => {
  return <FormControl {...props}></FormControl>;
};

export default Input;
