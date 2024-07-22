import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../components/Table";
import LinkButton from "../components/LinkButton";
import { deleteTransaction, getTransactions } from "../utils/supabaseDB";
import Modal from "../components/Modal";

export type TransactionType = {
  id: string;
  transactionId: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  paymentMethod: string;
  user_id: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const TransactionsPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<string>("");
  const [transactionsData, setTransactions] = React.useState<TransactionType[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  // const transactionsData = React.useMemo(() => transactions, []);

  const handleDeleteConfirmation = async (id: string) => {
    setShowModal(true);
    setSelectedRow(id);
  };

  const deleteRow = async (id: string) => {
    const { error } = await deleteTransaction(id);
    if (error) {
      console.error(error);
      return;
    }
    const updatedTransactions = transactionsData.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    setShowModal(false);
    toast.success("Transaction deleted successfully!");
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const user = localStorage.getItem("userId") as string;
      const { data, error } = await getTransactions(user);
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
      {
        id: "description",
        header: "Description",
        accessorKey: "description",
        cell: (info: { getValue: <T>() => T }) => (
          <span className="font-semibold text-neutral-600 dark:text-neutral-400 dark:text-neutral-400">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "date",
        cell: (info: { getValue: <T>() => T }) => (
          <span className="text-neutral-600 dark:text-neutral-400">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: (info: { getValue: <T>() => T }) => (
          <span className="text-neutral-600 dark:text-neutral-400">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        cell: (info: { getValue: <T>() => T }) => {
          const value = info.getValue<number>();
          const formattedValue = formatCurrency(value);
          return (
            <span className="text-neutral-600 dark:text-neutral-400">
              {formattedValue}
            </span>
          );
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
        cell: (info: { getValue: <T>() => T }) => (
          <span className="text-neutral-600 dark:text-neutral-400">
            {info.getValue<string>()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <main className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <ToastContainer />
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Are you sure you want to delete this transaction?"
        >
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteRow(selectedRow)}
              className="bg-rose-500 hover:bg-rose-600 text-neutral-100 px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      <div className="flex justify-between mb-4">
        <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
          All your transactions
        </h1>
        <LinkButton to="/account/transaction">New Transaction</LinkButton>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-400"></div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={transactionsData}
          handleDeleteRow={handleDeleteConfirmation}
        />
      )}
    </main>
  );
};

export default TransactionsPage;
