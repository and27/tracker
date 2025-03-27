import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  to: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton = ({ children, to, className, variant }: LinkButtonProps) => {
  return (
    <Link to={to}>
      <button
        className={`${
          variant === "primary"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-transparent border border-neutral-800 dark:border-white hover:bg-neutral-700/50"
        } text-white px-5 rounded font-bold text-sm md:text-base ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
