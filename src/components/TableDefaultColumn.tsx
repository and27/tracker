import { useEffect, useState } from "react";

type cellProps = {
  getValue: () => string;
  row: { id: string };
  column: { id: string; getIndex: () => number };
  table: {
    options: {
      meta: {
        editingRowId: number;
        updateData: (arg0: string, arg1: string, arg2: string) => void;
        rowRefs: { current: { [x: string]: HTMLInputElement | null } };
      };
    };
  };
};
interface IColumn {
  Cell: ({ getValue, row, column, table }: cellProps) => JSX.Element;
}

export const defaultColumn: IColumn = {
  Cell: ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const isEditing = table.options.meta?.editingRowId === parseInt(row.id);

    // Sincronize external changes with the internal state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      table.options.meta?.updateData(row.id, column.id, value);
    };

    if (isEditing)
      return (
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
          className="w-full bg-transparent border-none text-neutral-600 dark:text-neutral-400"
        />
      );
    return <span>{getValue()}</span>;
  },
};
