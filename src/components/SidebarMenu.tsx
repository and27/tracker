import { NavLink } from "react-router-dom";
import "../styles/SidebarMenu.css";

const SidebarMenu = () => {
  return (
    <div className="col-span-2 p-5 h-screen bg-teal-500 text-white">
      <ul className="flex flex-col gap-4 items-start w-full">
        <li className="w-full ">
          <NavLink to="/" className="block text-start">
            Overview
          </NavLink>
        </li>
        <li className="w-full p-2">
          <NavLink to="/users" className="block text-start">
            Transactions
          </NavLink>
        </li>
        <li className="w-full p-2">
          <NavLink to="/products" className="block text-start">
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
