import { Link } from "react-router-dom";
import LinkButton from "./LinkButton";

const TopMenu = () => {
  return (
    <nav className="grid grid-cols-3 items-center gap-10 px-12 shadow-sm bg-white dark:bg-neutral-900 dark:text-white z-10 relative">
      <img src="/logoCard.svg" alt="logo" width="24" height="24" />
      <ul className="flex justify-around justify-self-stretch text-neutral-700 dark:text-neutral-300 ">
        <li className="hover:underline active:underline hover:animate-pulse p-5">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline active:underline hover:animate-pulse p-5">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline active:underline hover:animate-pulse p-5">
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
