import { useEffect, useState } from "react";

interface IColumn {
  cell: ({ getValue, row, column, table }: any) => JSX.Element;
}

export const defaultColumn: IColumn = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const isEditing = table.options.meta?.editingRowId === parseInt(row.id);

    // Sincronize external changes with the internal state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      table.options.meta?.updateData(row.id, id, value);
    };

    if (isEditing)
      return (
        <input
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="w-full bg-transparent border-none text-neutral-600 dark:text-neutral-400"
        />
      );
    return <span>{getValue()}</span>;
  },
};
