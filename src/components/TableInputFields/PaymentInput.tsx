import { InputProps } from "./DateInput";

const PaymentInput: React.FC<InputProps> = ({
  value,
  setValue,
  row,
  table,
}) => (
  <select
    value={value as string}
    onChange={(e) => setValue(e.target.value)}
    ref={(el) => {
      if (table.options.meta?.rowRefs.current) {
        table.options.meta.rowRefs.current[row.id] = el;
      }
    }}
    className="w-full text-neutral-600 dark:text-neutral-400
          border border-neutral-700 py-1 px-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
    data-row-id={row.id}
  >
    <option value="cash">Cash</option>
    <option value="credit">Credit</option>
    <option value="debit">Debit</option>
  </select>
);

export default PaymentInput;
