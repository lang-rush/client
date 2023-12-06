import { useFoldersQuery } from "src/genetated/types";
import Folder from "../Folder/Folder";
import FolderAdd from "../FolderAdd/FolderAdd";
import s from "./FoldersContainer.module.scss";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { Preloader } from "@Components/UI/Preloaders";
import FormAddFolder from "../FormAddFolder/FormAddFolder";
import { useState } from "react";
import ConfirmDeleteFolder from "../ConfirmDeleteFolder/ConfirmDeleteFolder";

const FoldersContainer = () => {
  const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);
  const [isDeletingFolder, setIsDeletingFolder] = useState<boolean>(false);
  const [deleteFolderId, setDeleteFolderId] = useState<string>("");

  const { data, loading, error } = useFoldersQuery();

  const navigate = useNavigate();

  if (error?.message === "Unauthorized") {
    removeTokens();
    navigate("/signin");
  }

  const handleDeleteClick = (id: string) => {
    setDeleteFolderId(id);
    setIsDeletingFolder(true);
  };

  return (
    <div style={{ height: "100vh" }}>
      {isAddingFolder ? (
        <FormAddFolder
          isAddingFolder={isAddingFolder}
          setIsAddingFolder={setIsAddingFolder}
        />
      ) : null}
      {isDeletingFolder ? (
        <ConfirmDeleteFolder
          isDeletingFolder={isDeletingFolder}
          setIsDeletingFolder={setIsDeletingFolder}
          folderId={deleteFolderId}
        />
      ) : null}
      <div className={s.container}>
        {loading ? (
          <div style={{ margin: "auto" }}>
            <Preloader />
          </div>
        ) : (
          <>
            <FolderAdd onClick={() => setIsAddingFolder(true)} />
            {data?.folders.map((folder, i) => (
              <Folder
                key={i}
                id={folder.id}
                name={folder.name}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FoldersContainer;
