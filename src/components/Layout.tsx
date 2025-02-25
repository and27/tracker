import { Outlet } from "react-router-dom";
import SidebarMenu from "./Sections/SidebarMenu";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { useLanguageStore } from "../store/languageStore";
import UsersnapWidget from "./UserSnap";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, setLang } = useLanguageStore();

  return (
    <>
      <div
        className="relative flex flex-col w-full dark:bg-neutral-900 dark:text-neutral-100
        bg-neutral-100 text-neutral-900"
      >
        <select
          onChange={(e) => setLang(e.target.value)}
          value={lang}
          className="
            absolute right-20 top-3 lg:right-5 lg:top-5
            border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
        >
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
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
