import React from "react";
import s from "./WordContainer.module.scss";
import Word from "../Word/Word";
import WordAdd from "../WordAdd/WordAdd";

const words = [
  {
    id: "someId",
    name: "Sample",
  },
  {
    id: "someId",
    name: "Sample",
  },
  {
    id: "someId",
    name: "Sample",
  },
  {
    id: "someId",
    name: "Sample",
  },
  {
    id: "someId",
    name: "Sample",
  },
  {
    id: "someId2",
    name: "Sample2",
  },
];

const WordContainer = () => {
  return (
    <div className={s.container}>
      <input className={s.search} type="text" placeholder="Search" />
      <div className={s.wordContainer}>
        <WordAdd />
        {words.map((word, i) => (
          <Word key={i} id={word.id} name={word.name} />
        ))}
      </div>
    </div>
  );
};

export default WordContainer;
