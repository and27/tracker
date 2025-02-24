import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFire, FaTable } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import "../../styles/SidebarMenu.css";
import { useLanguageStore } from "../../store/languageStore";

interface SidebarMenuProps {
  isOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const SidebarMenu = ({ isOpen, setIsSidebarOpen }: SidebarMenuProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { t } = useLanguageStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile, setIsSidebarOpen]);

  return (
    <nav
      aria-label="Barra lateral de navegación"
      className={`absolute lg:sticky
      flex flex-col justify-between col-span-2 py-10 px-5 h-full md:h-screen bg-indigo-700 text-white
      top-0 left-0 z-10 transition-transform duration-300 transform w-56 lg:w-auto
      ${
        !isMobile ? "relative" : isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="flex items-center gap-4 pl-2 mb-10">
          <img
            src="/logoCard.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
            className=""
          />
          <p
            className={`font-bold text-xl uppercase tracking-wide  font-outfit`}
          >
            Tracker
          </p>
        </div>
        <ul className="flex flex-col gap-4 items-start w-full">
          <li className="w-full">
            <NavLink
              to="/account/overview"
              className="flex gap-2 items-center block text-start px-4 py-3 
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaMoneyCheckDollar />
              {t("menu.overview")}
            </NavLink>
          </li>
          <li className="w-full ">
            <NavLink
              to="/account/transactions"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaTable />
              {t("menu.transactions")}
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/account/transaction"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaPlusCircle />
              {t("menu.newTransaction")}
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/account/reports"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaChartColumn />
              {t("menu.reports")}
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/account/insights"
              className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
            >
              <FaFire />
              {t("menu.insights")}
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <NavLink
          to="/account/settings"
          className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
        >
          <FaGear />
          {t("menu.settings")}
        </NavLink>
        <NavLink
          to="/logout"
          className="flex gap-2 items-center block text-start px-4 py-3
            rounded active:bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-gray-5"
        >
          <FaSignOutAlt />
          {t("menu.logout")}
        </NavLink>
      </div>
    </nav>
  );
};

export default SidebarMenu;
