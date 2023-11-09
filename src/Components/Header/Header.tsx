import { IconButton } from "@Components/UI/Buttons";
import s from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { ReactSVG } from "react-svg";
import logout from "src/assets/images/logout.svg";

const Header = () => {
  return (
    <header className={s.header}>
      <h3 className={s.logo}>
        <span>Lang</span>
        <span>Rush</span>
      </h3>
      <div className={s.buttons}>
        <ThemeToggle />
        <IconButton>
          <ReactSVG src={logout} />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
