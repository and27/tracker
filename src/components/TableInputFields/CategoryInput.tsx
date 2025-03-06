import { categoryList } from "../../data/defaultCategories";
import { InputProps } from "./DateInput";

const CategoryInput: React.FC<InputProps> = ({
  value,
  setValue,
  row,
  table,
}) => {
  return (
    <select
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      ref={(el) => {
        if (table.options.meta?.rowRefs.current) {
          table.options.meta.rowRefs.current[row.id] = el;
        }
      }}
      className="w-auto border border-neutral-700 py-1 px-2
        rounded-md bg-neutral-100 dark:bg-neutral-800"
      data-row-id={row.id}
    >
      {categoryList.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryInput;
