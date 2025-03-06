import { InputProps } from "./DateInput";

const DefaultInput: React.FC<InputProps> = ({
  value,
  setValue,
  onBlur,
  row,
  table,
  column,
}) => (
  <input
    value={value || ""}
    onChange={(e) => setValue(e.target.value)}
    onBlur={onBlur}
    ref={(el) => {
      if (column.getIndex() === 0) {
        if (table.options.meta?.rowRefs.current) {
          table.options.meta.rowRefs.current[row.id] = el;
        }
      }
    }}
    className="w-auto border border-neutral-700 py-1 px-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
    data-row-id={row.id}
  />
);

export default DefaultInput;
