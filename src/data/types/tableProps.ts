import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./transactions";

export type TableProps = {
  columns: ColumnDef<Transaction>[];
  data: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
  handleDeleteRow: (id: string) => void;
};
