import { FaEye } from "react-icons/fa6";
import { useState } from "react";

const InputWithLabel = ({
  type = "text",
  label,
  name,
  className,
  handleChange,
}: inputLabelProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full mb-2">
      <input
        className={`peer bg-transparent border border-gray-300 py-3 px-4  rounded-md w-full text-white focus:outline-none ${className}`}
        type={type}
        id={name}
        name={name}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value !== "")}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={`
          bg-neutral-900 px-2 rounded absolute left-2 -top-2 text-sm text-gray-400 dark:text-neutral-300 transition-all
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-300
          peer-focus:-top-2.5 peer-focus:text-sm 
        `}
      >
        {label}
      </label>

      {name === "password" && (
        <button
          type="button"
          className="bg-transparent p-0 absolute right-4 top-3 text-gray-500"
          onClick={() => {
            const input = document.getElementById(name) as HTMLInputElement;
            input.type = input.type === "password" ? "text" : "password";
          }}
        >
          <FaEye />
        </button>
      )}
    </div>
  );
};

export default InputWithLabel;
