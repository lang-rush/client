import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.scss";
import { useAppSelector } from "src/store/store";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const Button = ({ children, ...props }: IButtonProps) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  return (
    <button className={isDark ? `${s.button} ${s.dark}` : s.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
