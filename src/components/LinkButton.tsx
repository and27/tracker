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
            ? "bg-indigo-600 hover:bg-indigo-700 text-neutral-100"
            : "bg-transparent border border-neutral-800 dark:border-white hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
        } px-5 py-2 rounded text-sm md:text-base ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
