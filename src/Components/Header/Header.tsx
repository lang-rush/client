import s from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <header>
      <h3 className={s.logo}>
        <span>Lang</span>
        <span>Rush</span>
      </h3>
      <div className={s.buttons}>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
