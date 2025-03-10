interface Transaction {
  id: string;
  description: string;
  date: string;
  category: {
    id: number;
    name: string;
  };
  amount: number;
  type: "income" | "expense";
  paymentMethod: {
    id: number;
    name: string;
  };
  userId: string;
  workspaceId: string;
}

type TransactionCreate = Omit<Transaction, "id" | "createdAt">;

interface ApiResponseTransactions<T> {
  data: T | null;
  error: string | null;
}

type ConsolidatedTransactions = Record<
  number,
  {
    category: { id: number; name: string };
    total_spent: number;
    total_transactions: number;
    average_spent: number;
    last_transaction_date: string;
  }
>;
