import { ButtonHTMLAttributes, FC } from "react";
import edit from "@assets/images/edit.svg";
import s from "./EditButton.module.scss";

interface IEditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const EditButton: FC<IEditButtonProps> = (props) => {
  return (
    <button className={s.button} {...props}>
      <img src={edit} />
    </button>
  );
};

export default EditButton;
