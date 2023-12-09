import s from "./WordAdd.module.scss";
import { useAppSelector } from "src/store/store";
import plus from "@assets/images/plus.svg";
import { FC } from "react";

interface IWordAddProps {
  onClick?: () => void;
}

const WordAdd: FC<IWordAddProps> = ({ onClick }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div
      className={isDark ? `${s.container} ${s.dark}` : s.container}
      onClick={onClick}
    >
      New Word
      <div className={s.circle}>
        <img src={plus} />
      </div>
    </div>
  );
};

export default WordAdd;
