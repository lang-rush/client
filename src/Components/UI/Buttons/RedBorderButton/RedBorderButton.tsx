import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./RedBorderButton.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const RedBorderButton = ({ children, ...props }: IButtonProps) => {
  return (
    <button className={s.button} {...props}>
      {children}
    </button>
  );
};

export default RedBorderButton;
