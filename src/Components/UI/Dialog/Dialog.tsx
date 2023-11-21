import { useAppSelector } from "src/store/store";
import s from "./Dialog.module.scss";
import { FC } from "react";
import { useClickAway } from "@uidotdev/usehooks";

interface IDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
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
      {children}
    </dialog>
  );
};

export default Dialog;
