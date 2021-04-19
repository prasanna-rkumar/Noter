import { FC } from "react";
import { GrAddCircle, GrLogout } from "react-icons/gr";
import { noterAuth } from "../firebase";

const Navbar: FC = () => (
  <nav className="fixed bg-white z-40 top-0 left-0 h-16 w-full border-b-2 border-gray-700 border-opacity-25 grid grid-cols-12 gap-4 items-center px-4">
    <div className="col-span-3 flex gap-2 items-center">
      <img
        className="cursor-pointer"
        width={36}
        height={36}
        src="/notes.svg"
        alt="logo"
      />
      <h1 className="font-semibold text-gray-600 text-xl">Noter</h1>
    </div>
    <div className="col-span-7 ">
      <input
        placeholder="Search"
        type="text"
        className="bg-gray-200 rounded w-full max-w-md h-10 pl-4"
      />
    </div>
    <div className="col-span-2 flex gap-3 justify-end ">
      <GrAddCircle size={32} className="float-right cursor-pointer" />
      <GrLogout
        onClick={() => noterAuth.signOut()}
        size={30}
        className="float-right cursor-pointer"
      />
    </div>
  </nav>
);

export default Navbar;
