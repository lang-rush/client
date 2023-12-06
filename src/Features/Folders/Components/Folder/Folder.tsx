import { useAppSelector } from "src/store/store";
import folderImage from "@assets/images/folder.svg";
import deleteIcon from "@assets/images/delete.svg";
import s from "./Folder.module.scss";
import { FC } from "react";

interface IFolderProps {
  id: string;
  name: string;
  handleDeleteClick: (id: string) => void;
}

const Folder: FC<IFolderProps> = ({ id, name, handleDeleteClick }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? `${s.container} ${s.dark}` : s.container}>
      <img src={folderImage} className={s.image} />
      <p className={s.name}>{name}</p>
      <button
        type="button"
        className={s.delete}
        onClick={() => handleDeleteClick(id)}
      >
        <img src={deleteIcon} className={s.image} />
      </button>
    </div>
  );
};

export default Folder;
