import { FaEye } from "react-icons/fa6";

const InputWithLabel = ({
  label,
  name,
  type = "text",
  handleChange,
}: inputLabelProps) => (
  <label
    htmlFor={name}
    className="relative flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
  >
    {label}
    <input
      className="bg-transparent border border-gray-400 p-2 rounded-md mt-1"
      type={type}
      id={name}
      name={name}
      onChange={handleChange}
    />
    {name === "password" && (
      <>
        <button
          className="bg-transparent p-0 absolute right-4 bottom-4 text-gray-500"
          onClick={() => {
            const input = document.getElementById(name) as HTMLInputElement;
            input.type = input.type === "password" ? "text" : "password";
          }}
        >
          <FaEye />
        </button>
      </>
    )}
  </label>
);

export default InputWithLabel;
