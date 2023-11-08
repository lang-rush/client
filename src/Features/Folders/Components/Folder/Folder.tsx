import { useAppSelector } from "src/store/store";
import folderImage from "@assets/images/folder.svg";
import s from "./Folder.module.scss";
import { FC } from "react";
import { ReactSVG } from "react-svg";

interface IFolderProps {
  id: string;
  name: string;
}

const Folder: FC<IFolderProps> = ({ name }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? `${s.container} ${s.dark}` : s.container}>
      <ReactSVG src={folderImage} className={s.image} />
      <p className={s.name}>{name}</p>
    </div>
  );
};

export default Folder;
