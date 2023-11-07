import { InputHTMLAttributes } from "react";
import s from "./Input.module.scss";
import { useAppSelector } from "src/store/store";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: IInputProps) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <input
      type="text"
      className={isDark ? `${s.input} ${s.dark}` : s.input}
      {...props}
    />
  );
};

export default Input;
