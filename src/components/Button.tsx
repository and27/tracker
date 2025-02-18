interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "submit",
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} bg-indigo-600 text-white px-5 rounded hover:bg-indigo-700 font-bold
      text-sm md:text-base`}
    >
      {children}
    </button>
  );
};

export default Button;
