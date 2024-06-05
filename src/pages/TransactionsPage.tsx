import React from "react";
import Table from "../components/Table";
import SidebarMenu from "../components/SidebarMenu";

type Transaction = {
  transactionId: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  paymentMethod: string;
};

const transactions: Transaction[] = [
  {
    transactionId: "1",
    date: "2024-06-01",
    description: "Salary Payment",
    category: "Income",
    amount: 3000,
    type: "income",
    paymentMethod: "Bank Transfer",
  },
  {
    transactionId: "2",
    date: "2024-06-02",
    description: "Grocery Shopping",
    category: "Food",
    amount: 150,
    type: "expense",
    paymentMethod: "Credit Card",
  },
  {
    transactionId: "3",
    date: "2024-06-03",
    description: "Electricity Bill",
    category: "Utilities",
    amount: 75,
    type: "expense",
    paymentMethod: "Debit Card",
  },
];

const TransactionsPage: React.FC = () => {
  const transactionsData = React.useMemo(() => transactions, []);

  const columns = React.useMemo(
    () => [
      {
        id: "transactionId",
        header: "Transaction ID",
        accessorKey: "transactionId",
      },
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
        <main className="col-span-10 p-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold mb-6">Transactions</h1>
            <button className="bg-teal-500 px-5 rounded">
              New Transaction
            </button>
          </div>
          <Table columns={columns} data={transactionsData} />;
        </main>
      </div>
    </>
  );
};

export default TransactionsPage;
