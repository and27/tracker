import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export const defaultColumn: Partial<ColumnDef<Transaction, unknown>> = {
  cell: ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<
      string | number | readonly string[] | undefined
    >(initialValue as string | number | readonly string[] | undefined);
    const isEditing = table.options.meta?.editingRowId?.toString() === row.id;

    // Sincronize external changes with the internal state
    useEffect(() => {
      setValue(initialValue as string | number | readonly string[] | undefined);
    }, [initialValue]);

    const onBlur = () => {
      if (table.options.meta?.updateData)
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
    return <span>{getValue() as React.ReactNode}</span>;
  },
};
