export interface Transaction {
  id: string;
  description: string;
  date: string;
  categoryId?: number;
  amount: number;
  type: "income" | "expense";
  paymentMethodId?: number;
  userId: string;
}

export type TransactionCreate = Omit<Transaction, "id" | "createdAt">;

export interface ApiResponseTransactions<T> {
  data: T | null;
  error: string | null;
}
