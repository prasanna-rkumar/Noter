import { FC, useContext } from "react";
import { BsViewList } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { FiGrid } from 'react-icons/fi';
import { AppContext } from "../context/AppContext";
import { noterAuth } from "../firebase";
import IconButton from "./shared/IconButton";

const Navbar: FC = () => {
  return (
    <nav className="fixed bg-white z-40 top-0 left-0 h-16 w-full border-b-2 border-gray-700 border-opacity-25 grid grid-cols-12 gap-4 items-center px-4">
      <div className="col-span-2 sm:col-span-3 flex gap-2 items-center">
        <img
          className="cursor-pointer"
          width={36}
          height={36}
          src="/notes.svg"
          alt="logo"
        />
        <h1 className="font-semibold invisible sm:visible text-gray-600 text-xl">
          Noter
        </h1>
      </div>
      <div className="col-span-6">
        <input
          placeholder="Search by exact Title"
          type="text"
          className="bg-gray-200 rounded w-full max-w-md h-10 pl-2 md:pl-4"
        />
      </div>
      <div className="col-start-11 col-span-2 flex gap-0 md:gap-3 justify-end ">
        <LayoutToggleButton />
        <IconButton onClick={() => noterAuth.signOut()}>
          <AiOutlineLogout size={26} />
        </IconButton>
      </div>
    </nav>
  );
};

const LayoutToggleButton = () => {
  const { layout, toggleLayout } = useContext(AppContext);
  return (
    <IconButton onClick={() => toggleLayout()}>
      {layout !== "grid" ? <FiGrid size={26} /> : <BsViewList size={26} />}
    </IconButton>
  );
};

export default Navbar;
