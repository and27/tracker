import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ children, to, className }: LinkButtonProps) => {
  return (
    <Link to={to}>
      <button
        className={`${
          className === "primary"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-neutral-700 hover:bg-neutral-700/50"
        } text-white px-5 rounded font-bold
          text-sm  ${className}"`}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
