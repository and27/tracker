import { Outlet } from "react-router-dom";
import { Footer } from "./Sections/Footer";
import SidebarMenu from "./Sections/SidebarMenu";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 flex flex-col w-full">
      <button
        className="static lg:hidden bg-indigo-500 text-white px-4 py-2 my-5 mx-9 self-end"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaX /> : <FaBars />}
      </button>
      <div className="grid grid-cols-12 w-full">
        <SidebarMenu isOpen={isSidebarOpen} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
