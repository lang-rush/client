import { useAppSelector } from "src/store/store";
import s from "./FolderAdd.module.scss";
import folderImage from "@assets/images/folder.svg";
import plus from "@assets/images/plus.svg";
import { FC } from "react";

interface IFolderAddProps {
  onClick: () => void;
}

const FolderAdd: FC<IFolderAddProps> = (props) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div
      className={isDark ? `${s.container} ${s.dark}` : s.container}
      {...props}
    >
      <div className={s.folder}>
        <img src={folderImage} className={s.image} />
        <div className={s.circle}>
          <img src={plus} />
        </div>
      </div>
      <p className={s.name}>New folder</p>
    </div>
  );
};

export default FolderAdd;
