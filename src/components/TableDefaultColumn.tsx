import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export const defaultColumn: Partial<ColumnDef<Transaction, unknown>> = {
  cell: ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState<
      string | number | readonly string[] | undefined
    >(initialValue as string | number | readonly string[] | undefined);
    const isEditing = table.options.meta?.editingRowId?.toString() === row.id;

    useEffect(() => {
      setValue(initialValue as string | number | readonly string[] | undefined);
    }, [initialValue]);

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      const isSameRow = relatedTarget?.closest(`[data-row-id="${row.id}"]`);

      if (!isSameRow && table.options.meta?.updateData) {
        table.options.meta.updateData(row.id, column.id, value as string);
      }
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
          data-row-id={row.id} // Para identificar los elementos de la misma fila
        />
      );

    if (column.id === "amount") {
      const formattedValue = formatCurrency(value as number);
      return (
        <span className="text-neutral-600 dark:text-neutral-400">
          {formattedValue}
        </span>
      );
    }
    return <span>{getValue() as React.ReactNode}</span>;
  },
};
