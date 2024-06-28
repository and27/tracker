interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-indigo-600 text-white px-5 mt-5 rounded hover:bg-indigo-700 font-bold">
      {children}
    </button>
  );
};

export default Button;
