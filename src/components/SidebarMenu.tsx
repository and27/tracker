import { NavLink } from "react-router-dom";
import "../styles/SidebarMenu.css";

const SidebarMenu = () => {
  return (
    <div className="col-span-2 p-5 h-screen bg-teal-500 text-white">
      <ul className="flex flex-col gap-4 items-start w-full">
        <li className="w-full ">
          <NavLink to="/" className="block text-start p-2 rounded">
            Overview
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/transactions" className="block text-start p-2 rounded">
            Transactions
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/reports" className="block text-start p-2 rounded">
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
