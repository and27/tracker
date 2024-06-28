import React, { useEffect } from "react";
import Table from "../components/Table";
import LinkButton from "../components/LinkButton";
import { getTransactions } from "../utils/supabaseDB";

export type Transaction = {
  transactionId: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  paymentMethod: string;
};

const TransactionsPage: React.FC = () => {
  const [transactionsData, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // const transactionsData = React.useMemo(() => transactions, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const { data, error } = await getTransactions();
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setTransactions(data);
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const columns = React.useMemo(
    () => [
      // {
      //   id: "transactionId",
      //   header: "Transaction ID",
      //   accessorKey: "transactionId",
      // },
      {
        id: "description",
        header: "Description",
        accessorKey: "description",
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "date",
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
      },
      {
        id: "type",
        header: "Type",
        accessorKey: "type",
      },
      {
        id: "paymentMethod",
        header: "Payment Method",
        accessorKey: "paymentMethod",
      },
    ],
    []
  );

  return (
    <main className="col-span-12 lg:col-span-10 pt-10 px-8 dark:bg-zinc-900">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-6">Transactions</h1>
        <LinkButton to="/transaction">New Transaction</LinkButton>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-400"></div>
        </div>
      ) : (
        <Table columns={columns} data={transactionsData} />
      )}
    </main>
  );
};

export default TransactionsPage;
