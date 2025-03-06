import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  translateCategory,
  translatePaymentMethod,
} from "../utils/translationUtils";
import { useLanguageStore } from "../store/languageStore";
import DateInput from "./TableInputFields/DateInput";
import CategoryInput from "./TableInputFields/CategoryInput";
import TypeInput from "./TableInputFields/TypeInput";
import PaymentInput from "./TableInputFields/PaymentInput";
import DefaultInput from "./TableInputFields/DefaultInput";

export const defaultColumn: Partial<ColumnDef<Transaction, unknown>> = {
  cell: ({ getValue, row, column, table }) => {
    const { t } = useLanguageStore();
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

    if (isEditing && column.id === "date") {
      return (
        <DateInput
          value={value as string}
          setValue={setValue}
          onBlur={onBlur}
          row={row}
          table={table}
        />
      );
    }

    if (isEditing && column.id === "category") {
      return (
        <CategoryInput
          value={value as string}
          setValue={setValue}
          row={row}
          table={table}
        />
      );
    }

    if (isEditing && column.id === "type") {
      return (
        <TypeInput
          value={value as string}
          setValue={setValue}
          row={row}
          table={table}
        />
      );
    }

    if (isEditing && column.id === "paymentMethod") {
      return (
        <PaymentInput
          value={value as string}
          setValue={setValue}
          row={row}
          table={table}
        />
      );
    }

    if (isEditing && column.id === "amount") {
      return (
        <>
          <span>$</span>
          <input
            value={value || ""}
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
        </>
      );
    }

    if (isEditing)
      return (
        <DefaultInput
          value={value}
          setValue={setValue}
          onBlur={onBlur}
          row={row}
          table={table}
          column={column}
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

    if (column.id === "category") {
      const translatedCategory = translateCategory(value as string);
      return (
        <span className="text-neutral-600 dark:text-neutral-400">
          {translatedCategory || "Uncategorized"}
        </span>
      );
    }

    if (column.id === "paymentMethod") {
      const translatedMethod = translatePaymentMethod(value as string);
      return (
        <span className="text-neutral-600 dark:text-neutral-400">
          {translatedMethod || "Uncategorized"}
        </span>
      );
    }

    if (column.id === "type") {
      return value === "income" ? (
        <span className="bg-green-400 text-neutral-900 rounded px-3 py-1 text-sm">
          {t("transactions.income")}
        </span>
      ) : (
        <span className="bg-rose-400 text-neutral-900 rounded px-2 py-1 text-sm">
          {t("transactions.expense")}
        </span>
      );
    }

    return <span>{getValue() as React.ReactNode}</span>;
  },
};
