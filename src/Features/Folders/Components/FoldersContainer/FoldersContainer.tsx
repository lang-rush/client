import Folder from "../Folder/Folder";
import FolderAdd from "../FolderAdd/FolderAdd";
import s from "./FoldersContainer.module.scss";

const folders = [
  {
    id: "someId",
    name: "Sample",
  },
];

const FoldersContainer = () => {
  return (
    <div className={s.container}>
      <FolderAdd />
      {folders.map((folder, i) => (
        <Folder key={i} id={folder.id} name={folder.name} />
      ))}
    </div>
  );
};

export default FoldersContainer;
