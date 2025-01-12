import { Outlet } from "react-router-dom";
import SidebarMenu from "./Sections/SidebarMenu";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-neutral-900 opacity-70 lg:hidden absolute w-full h-full
        ${isSidebarOpen ? "block" : "hidden transition-all duration-300 z-10"}
      `}
      ></div>
      <div className="bg-neutral-50 dark:bg-neutral-900 flex flex-col w-full">
        <button
          className="relative static lg:hidden bg-indigo-700 text-white px-4 py-2 mt-2 mx-9 self-end"
          aria-label="Menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaX /> : <FaBars />}
        </button>
        <div className="grid grid-cols-12 w-full">
          <SidebarMenu
            isOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
