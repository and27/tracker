import { RowData } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    editingRowId?: string | null;
    updateData?: (rowId: string, columnId: string, value) => void;
    rowRefs?: MutableRefObject<Record<string, HTMLInputElement | null>>;
  }
}
