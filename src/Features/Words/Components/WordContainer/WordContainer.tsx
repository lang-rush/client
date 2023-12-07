import s from "./WordContainer.module.scss";
import Word from "../Word/Word";
import WordAdd from "../WordAdd/WordAdd";
import { useFolderQuery } from "src/genetated/types";
import { useNavigate, useParams } from "react-router-dom";
import { removeTokens } from "src/utils";
import { Preloader } from "@Components/UI/Preloaders";
import edit from "@assets/images/edit.svg";
import FormEditFolderName from "../FormEditFolderName/FormEditFolderName";
import { useState } from "react";

const WordContainer = () => {
  const [isEditingFolder, setIsEditingFolder] = useState(false);

  const params = useParams<{ id: string }>() as { id: string };

  const { data, loading, error } = useFolderQuery({
    variables: {
      id: params.id,
    },
  });

  const navigate = useNavigate();

  if (error?.message === "Unauthorized") {
    removeTokens();
    navigate("/signin");
  }

  return (
    <div className={s.container}>
      {loading ? (
        <div style={{ margin: "auto" }}>
          <Preloader />
        </div>
      ) : (
        <>
          {isEditingFolder && (
            <FormEditFolderName
              setIsEditingFolder={setIsEditingFolder}
              isEditingFolder={isEditingFolder}
              folderId={params.id}
              initialName={data?.folder.name}
            />
          )}
          <section className={s.header}>
            <div className={s.title}>{data?.folder.name}</div>
            <button
              type="button"
              className={s.edit}
              onClick={() => setIsEditingFolder(true)}
            >
              <img src={edit} />
            </button>
          </section>

          <hr className={s.hr} />

          <div className={s.wordContainer}>
            <WordAdd />
            {data?.folder.words?.map((word, i) => (
              <Word key={i} id={word.id} name={word.word} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WordContainer;
