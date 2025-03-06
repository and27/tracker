export type InputProps = {
  value: string | number | readonly string[] | undefined;
  setValue: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  row: any;
  table: any;
  column?: any;
};
const DateInput: React.FC<InputProps> = ({
  value,
  setValue,
  onBlur,
  row,
  table,
}) => {
  return (
    <input
      type="date"
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      ref={(el) => {
        if (table.options.meta?.rowRefs.current) {
          table.options.meta.rowRefs.current[row.id] = el;
        }
      }}
      className="w-full border border-neutral-700 py-1 px-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
      data-row-id={row.id}
    />
  );
};

export default DateInput;
