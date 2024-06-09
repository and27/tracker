import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

const TopMenu = () => {
  return (
    <nav className="grid grid-cols-3 items-center gap-10 px-12 py-4 shadow-sm bg-white z-10 relative">
      <img src="/logo.svg" alt="logo" width="50" height="50" />
      <ul className="flex justify-around text-slate-600 justify-self-stretch">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <LinkButton to="/login" className="justify-self-end">
        Login
      </LinkButton>
    </nav>
  );
};

export default TopMenu;
