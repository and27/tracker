import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ children, to, className }: LinkButtonProps) => {
  return (
    <Link to={to} className={className}>
      <button className={`bg-teal-500 text-white px-5 rounded`}>
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
