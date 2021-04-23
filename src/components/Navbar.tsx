import { FC, useContext } from "react";
import { GrAddCircle, GrLogout, GrList, GrGrid } from "react-icons/gr";
import { AppContext } from "../context/AppContext";
import { noterAuth } from "../firebase";
import Menu from "./shared/Menu";

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
      <div className="col-span-7 ">
        <input
          placeholder="Search by exact Title"
          type="text"
          className="bg-gray-200 rounded w-full max-w-md h-10 pl-4"
        />
      </div>
      <div className="col-span-2 flex gap-3 justify-end ">
        <LayoutToggleButton />
        <Menu
          title={
            <GrAddCircle size={32} className="float-right cursor-pointer" />
          }
          menuItems={[<div onClick={() => {}}>New Note</div>]}
        />
        <button>
          <GrLogout onClick={() => noterAuth.signOut()} size={30} />
        </button>
      </div>
    </nav>
  );
};

const LayoutToggleButton = () => {
  const { layout, toggleLayout } = useContext(AppContext);
  return (
    <button onClick={() => toggleLayout()}>
      {layout === "grid" ? <GrGrid size={26} /> : <GrList size={26} />}
    </button>
  );
};

export default Navbar;
