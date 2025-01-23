interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, onClick, type = "submit" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-indigo-600 text-white px-5 mt-5 rounded hover:bg-indigo-700 font-bold
      text-sm md:text-base"
    >
      {children}
    </button>
  );
};

export default Button;
