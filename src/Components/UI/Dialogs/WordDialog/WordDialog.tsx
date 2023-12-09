import { FC, ReactNode } from "react";
import s from "./WordDialog.module.scss";
import { useClickAway } from "@uidotdev/usehooks";
import { useAppSelector } from "src/store/store";
import close from "@assets/images/close.svg";

interface IWordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  header?: ReactNode;
  children?: ReactNode;
}

const WordDialog: FC<IWordDialogProps> = ({ setIsOpen, header, children }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const containerRef = useClickAway<HTMLDialogElement>(() => {
    setIsOpen(false);
  });

  return (
    <dialog
      className={isDark ? `${s.container} ${s.dark}` : s.container}
      ref={containerRef}
      aria-modal
    >
      <button
        type="button"
        className={s.close}
        onClick={() => setIsOpen(false)}
      >
        <img src={close} />
      </button>
      <div className={s.header}>{header}</div>
      {children}
    </dialog>
  );
};

export default WordDialog;
