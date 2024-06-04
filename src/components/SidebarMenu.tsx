import { NavLink } from "react-router-dom";
import "../styles/SidebarMenu.css";

const SidebarMenu = () => {
  return (
    <div className="basis-1/5 p-5 h-screen border-r-2 border-current w-full">
      <ul className="flex flex-col gap-4 items-start text-slate-500 w-full">
        <li className="w-full ">
          <NavLink to="/" className="text-slate-500 block text-start">
            Dashboard
          </NavLink>
        </li>
        <li className="w-full p-2">
          <NavLink to="/users" className="text-slate-500 block text-start">
            Users
          </NavLink>
        </li>
        <li className="w-full p-2">
          <NavLink to="/products" className="text-slate-500 block text-start">
            Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
