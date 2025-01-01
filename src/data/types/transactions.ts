export interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: string;
  paymentMethod: string;
  userId: string;
  createdAt?: string;
}

export type TransactionCreate = Omit<Transaction, "id" | "createdAt">;

export interface ApiResponseTransactions<T> {
  data: T | null;
  error: string | null;
}
