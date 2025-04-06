interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  onClick,
  type = "submit",
  className = "",
  variant = "primary",
}: ButtonProps) => {
  const base =
    "border px-4 py-2.5 rounded font-bold text-sm md:text-base transition-all";
  const variants = {
    primary: "border-indigo-600 bg-indigo-600 hover:bg-indigo-700",
    secondary:
      "bg-white text-indigo-600 dark:text-neutral-100 border-indigo-600 dark:border-neutral-100 hover:bg-indigo-50 dark:bg-transparent",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
