import { useAppDispatch, useAppSelector } from "src/store/store";
import s from "./ThemeToggle.module.scss";
import { toggle } from "src/store/features/themeModeSlice";

const ThemeToggle = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggle());
  };

  return (
    <label className={s.switch}>
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className={s.slider}></span>
    </label>
  );
};

export default ThemeToggle;
