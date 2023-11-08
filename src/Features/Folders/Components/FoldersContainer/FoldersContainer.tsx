import Folder from "../Folder/Folder";
import FolderAdd from "../FolderAdd/FolderAdd";
import s from "./FoldersContainer.module.scss";

const FoldersContainer = () => {
  return (
    <div className={s.container}>
      <FolderAdd />
      <Folder id={""} name={"folder"} />
    </div>
  );
};

export default FoldersContainer;
