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
}

type TransactionCreate = Omit<Transaction, "id" | "createdAt">;

interface ApiResponseTransactions<T> {
  data: T | null;
  error: string | null;
}
