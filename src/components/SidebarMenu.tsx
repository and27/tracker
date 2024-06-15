import { NavLink } from "react-router-dom";
import "../styles/SidebarMenu.css";
import { FaTable } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

interface SidebarMenuProps {
  isOpen: boolean;
}

const SidebarMenu = ({ isOpen }: SidebarMenuProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex flex-col justify-between col-span-2 py-10 px-5 h-full md:h-screen bg-indigo-600 text-white
      fixed top-0 left-0 z-10 transition-transform duration-300 transform
      ${
        !isMobile ? "relative" : isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <img
          src="/logo.svg"
          alt="logo"
          width="60"
          height="60"
          className="pl-2 mb-5"
        />
        <ul className="flex flex-col gap-4 items-start w-full">
          <li className="w-full">
            <NavLink
              to="/overview"
              className="flex gap-2 items-center block text-start px-4 py-3 
            rounded active:bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaMoneyCheckDollar />
              Overview
            </NavLink>
          </li>
          <li className="w-full ">
            <NavLink
              to="/transactions"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaTable />
              Transactions
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/reports"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaChartColumn />
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <NavLink
          to="/settings"
          className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-gray-5"
        >
          <FaGear />
          Settings
        </NavLink>
        <NavLink
          to="/"
          className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-teal-700 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-gray-5"
        >
          <FaSignOutAlt />
          Log out
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarMenu;
