import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../components/Table";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modal";
import { CellContext } from "@tanstack/react-table";
import { useTransactionStore } from "../store/transactionStore";
import { formatCurrency } from "../utils/formatCurrency";

const TransactionsPage: React.FC = () => {
  const userId = localStorage.getItem("userId") as string;

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const transactions = useTransactionStore((state) => state.transactions);
  const loadTransactions = useTransactionStore(
    (state) => state.loadTransactions
  );
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );
  const isLoading = useTransactionStore((state) => state.isLoading);

  const handleDeleteConfirmation = async (id: string) => {
    setShowModal(true);
    setSelectedRow(id);
  };

  const deleteRow = async (id: string) => {
    deleteTransaction(id, userId);
    setShowModal(false);
    toast.success("Transaction deleted successfully!");
  };

  useEffect(() => {
    loadTransactions(userId);
  }, [loadTransactions]);

  const columns = useMemo(
    () => [
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
        accessorKey: "category", // Change here to filter by category.name
        cell: (info: CellContext<Transaction, unknown>) => {
          const category = info.row.original.category;
          return (
            <span className="text-neutral-600 dark:text-neutral-400">
              {category?.name || "Uncategorized"}
            </span>
          );
        },
      },
      {
        id: "amount",
        header: "Amount",
        accessorKey: "amount",
        cell: (info: CellContext<Transaction, unknown>) => {
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
        cell: (info: CellContext<Transaction, unknown>) => {
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
        cell: (info: CellContext<Transaction, unknown>) => {
          const paymentMethod = info.row.original as any;
          return (
            <span className="text-neutral-600 dark:text-neutral-400">
              {paymentMethod?.payment_method.name || "Uncategorized"}
            </span>
          );
        },
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
        <LinkButton className="primary" to="/account/transaction">
          New Transaction
        </LinkButton>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-400"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Table
          columns={columns}
          data={transactions}
          handleDeleteRow={handleDeleteConfirmation}
          setData={() => {}}
        />
      )}
    </main>
  );
};

export default TransactionsPage;
