import React, { useEffect } from "react";
import Table from "../components/Table";
import SidebarMenu from "../components/SidebarMenu";
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
  // const transactionsData = React.useMemo(() => transactions, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await getTransactions();
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setTransactions(data);
        console.log(data);
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
    <>
      <div className="grid grid-cols-12">
        <SidebarMenu />
        <main className="col-span-10 pt-10 px-8 dark:bg-zinc-900">
          <div className="flex justify-between">
            <h1 className="text-3xl mb-6">Transactions</h1>
            <LinkButton to="/transaction">New Transaction</LinkButton>
          </div>
          <Table columns={columns} data={transactionsData} />
        </main>
      </div>
    </>
  );
};

export default TransactionsPage;
