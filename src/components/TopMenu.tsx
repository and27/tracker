import LinkButton from "./LinkButton";

const TopMenu = () => {
  return (
    <nav
      className="flex items-center px-12 shadow-sm 
      bg-neutral-900
    dark:text-white z-10 relative justify-between py-3"
    >
      <img src="/logoCard.svg" alt="logo" width="24" height="24" />

      <LinkButton to="/login" className="justify-self-end">
        Login
      </LinkButton>
    </nav>
  );
};

export default TopMenu;
