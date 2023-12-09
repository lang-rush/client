import { useAppSelector } from "src/store/store";
import s from "./Dialog.module.scss";
import { FC } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import close from "@assets/images/close.svg";

interface IDialogProps {
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}
const Dialog: FC<IDialogProps> = ({ children, setIsOpen }) => {
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
      {children}
    </dialog>
  );
};

export default Dialog;
