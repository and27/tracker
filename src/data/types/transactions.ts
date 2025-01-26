interface Transaction {
  id: string;
  description: string;
  date: string;
  categoryId?: number;
  amount: number;
  type: "income" | "expense";
  paymentMethodId?: number;
  userId: string;
}

type TransactionCreate = Omit<Transaction, "id" | "createdAt">;

interface ApiResponseTransactions<T> {
  data: T | null;
  error: string | null;
}
