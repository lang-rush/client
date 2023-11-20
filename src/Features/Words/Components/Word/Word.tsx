import React from "react";
import s from "./Word.module.scss";
import { useAppSelector } from "src/store/store";

interface IWordProps {
  id: string;
  name: string;
}

const Word: React.FC<IWordProps> = ({ name }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? `${s.container} ${s.dark}` : s.container}>
      {name}
    </div>
  );
};

export default Word;
