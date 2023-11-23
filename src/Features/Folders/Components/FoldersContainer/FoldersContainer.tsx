import { useFoldersQuery } from "src/genetated/types";
import Folder from "../Folder/Folder";
import FolderAdd from "../FolderAdd/FolderAdd";
import s from "./FoldersContainer.module.scss";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { Preloader } from "@Components/UI/Preloaders";
import FormAddFolder from "../FormAddFolder/FormAddFolder";
import { useState } from "react";

const FoldersContainer = () => {
  const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);

  const { data, loading, error } = useFoldersQuery();

  const navigate = useNavigate();

  if (error?.name === "UNAUTHENTICATED") {
    removeTokens();
    navigate("/signin");
  }

  return (
    <div style={{ height: "100vh" }}>
      {isAddingFolder ? (
        <FormAddFolder
          isAddingFolder={isAddingFolder}
          setIsAddingFolder={setIsAddingFolder}
        />
      ) : null}
      <div className={s.container}>
        {loading ? (
          <Preloader />
        ) : (
          <>
            <FolderAdd onClick={() => setIsAddingFolder(true)} />
            {data?.folders.map((folder, i) => (
              <Folder key={i} id={folder.id} name={folder.name} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FoldersContainer;
