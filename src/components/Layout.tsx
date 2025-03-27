import { Outlet } from "react-router-dom";
import SidebarMenu from "./Sections/SidebarMenu";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import UsersnapWidget from "./UserSnap";
import LanguageSwitcher from "./LanguageSwitcher";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div
        className="relative flex flex-col w-full dark:bg-neutral-900 dark:text-neutral-100
        bg-neutral-100 text-neutral-900"
      >
        <div className="flex gap-3 absolute right-20 top-3 lg:right-6 lg:top-5">
          <LanguageSwitcher />
          {/* <EnvironmentSwitcher /> */}
        </div>
        <button
          className="relative static lg:hidden bg-indigo-700 text-white mr-4 py-3 mt-3 self-end"
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
          <UsersnapWidget />
        </div>
      </div>
    </>
  );
};

export default Layout;
