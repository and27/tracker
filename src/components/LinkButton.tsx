import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ children, to, className }: LinkButtonProps) => {
  return (
    <Link to={to} className={className}>
      <button
        className={`bg-indigo-600 text-white px-5 rounded hover:bg-indigo-700 font-bold`}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
