import { FC, useState } from "react";
import s from "./Dropdown.module.scss";
import arrow from "../../../../assets/images/dropdownArrow.png";
import { useAppSelector } from "src/store/store";

export type DropdownOption = {
  label: string;
  value: string;
  imagePath?: string;
};

interface IDropdownProps {
  options: DropdownOption[];
  value?: DropdownOption;
  onChange: (value: DropdownOption) => void;
  width?: string;
}
const Dropdown: FC<IDropdownProps> = ({ options, value, onChange, width }) => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={
        `${isOpen ? s.open : ""} ${isDark ? s.dark : ""}` + " " + s.container
      }
      style={{ width }}
      onClick={toggle}
      onBlur={() => setIsOpen(false)}
    >
      {value?.imagePath ? (
        <img src={value.imagePath} alt="flag" className={s.flag} />
      ) : null}
      <span className={s.value}>{value?.label}</span>
      <img src={arrow} alt="arrow" className={s.arrow} />

      <ul className={s.options}>
        {options.map((option) => (
          <li key={option.value} onClick={() => onChange(option)}>
            {option.imagePath && (
              <img src={option.imagePath} alt="flag" className={s.flag} />
            )}
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
