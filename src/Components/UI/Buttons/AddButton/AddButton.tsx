import s from "./AddButton.module.scss";
import React, { ButtonHTMLAttributes } from "react";

interface IAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const AddButton: React.FC<IAddButtonProps> = (props) => {
  return (
    <button className={s.button} {...props}>
      +
    </button>
  );
};

export default AddButton;
