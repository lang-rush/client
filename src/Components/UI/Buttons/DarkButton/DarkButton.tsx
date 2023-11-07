import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./DarkButton.module.scss";
import { useAppSelector } from "src/store/store";

interface IDarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const DarkButton = ({ children, ...props }: IDarkButtonProps) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <button className={isDark ? `${s.button} ${s.dark}` : s.button} {...props}>
      {children}
    </button>
  );
};

export default DarkButton;
