import { IconButton } from "@Components/UI/Buttons";
import s from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { ReactSVG } from "react-svg";
import logout from "src/assets/images/logout.svg";
import { useLogoutMutation } from "src/genetated/types";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "src/utils";

const Header = () => {
  const [logOut] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logOut();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/signin");
  };

  return (
    <header className={s.header}>
      <h3 className={s.logo}>
        <span>Lang</span>
        <span>Rush</span>
      </h3>
      <div className={s.buttons}>
        <ThemeToggle />
        {getRefreshToken() ? (
          <IconButton onClick={handleLogoutClick}>
            <ReactSVG src={logout} />
          </IconButton>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
