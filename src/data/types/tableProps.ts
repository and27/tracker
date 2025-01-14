import { Transaction } from "./transactions";

export type TableProps = {
  columns: string[];
  data: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
  handleDeleteRow: (id: string) => void;
};
