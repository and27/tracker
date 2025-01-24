import { Link } from "react-router-dom";

const LogoImage = () => {
  return (
    <Link to="/">
      <img
        src="/logoCard.svg"
        alt="logo"
        width="50"
        height="50"
        className="mx-auto mb-5 size-[2rem] lg:size-[3rem] filter brightness-75 dark:brightness-100"
      />
    </Link>
  );
};

export default LogoImage;
