import { FC, ReactNode } from "react";

interface IconButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button style={{ cursor: "pointer" }} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
