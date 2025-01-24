const InputWithLabel = ({
  label,
  name,
  type = "text",
  handleChange,
}: inputLabelProps) => (
  <label
    htmlFor={name}
    className="flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
  >
    {label}
    <input
      className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
      type={type}
      id={name}
      name={name}
      onChange={handleChange}
    />
  </label>
);

export default InputWithLabel;
