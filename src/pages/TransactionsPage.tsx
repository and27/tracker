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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

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
        cell: (info: { getValue: <T>() => T }) => {
          const value = info.getValue<number>();
          const formattedValue = formatCurrency(value);
          return formattedValue;
        },
      },
      {
        id: "type",
        header: "Type",
        accessorKey: "type",
        cell: (info: { getValue: <T>() => T }) => {
          const value = info.getValue<"income" | "expense">();
          return value === "income" ? (
            <span className="bg-green-300 dark:bg-green-800 text-neutral-900 dark:text-neutral-100 rounded px-2 text-sm">
              Income
            </span>
          ) : (
            <span className="bg-rose-300 dark:bg-rose-800 text-neutral-900 dark:text-neutral-100 rounded px-2 text-sm">
              Expense
            </span>
          );
        },
      },
      {
        id: "paymentMethod",
        header: "Payment Method",
        accessorKey: "payment_method",
      },
    ],
    []
  );

  return (
    <main className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900">
      <div className="flex justify-between">
        <h1 className="text-2xl lg:text-3xl mb-6 font-outfit">
          All your transactions
        </h1>
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
