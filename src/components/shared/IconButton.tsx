import { MouseEvent } from "react";

interface Props {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: JSX.Element;
}

const IconButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="transition-all w-12 h-12 duration-200 p-3 hover:bg-gray-200 rounded-full"
    >
      {children}
    </button>
  );
};

export default IconButton;
