import { useFoldersQuery } from "src/genetated/types";
import Folder from "../Folder/Folder";
import FolderAdd from "../FolderAdd/FolderAdd";
import s from "./FoldersContainer.module.scss";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "src/utils";
import { Preloader } from "@Components/UI/Preloaders";

const FoldersContainer = () => {
  const { data, loading, error } = useFoldersQuery();

  const navigate = useNavigate();

  if (error?.name === "UNAUTHENTICATED") {
    removeTokens();
    navigate("/signin");
  }

  return (
    <div className={s.container}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <FolderAdd />
          {data?.folders.map((folder, i) => (
            <Folder key={i} id={folder.id} name={folder.name} />
          ))}
        </>
      )}
    </div>
  );
};

export default FoldersContainer;
