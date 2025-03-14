import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../components/Table";
import LinkButton from "../components/LinkButton";
import Modal from "../components/Modals/Modal";
import { useTransactionStore } from "../store/transactionStore";
import Spinner from "../components/Spinner";
import { useLanguageStore } from "../store/languageStore";

const TransactionsPage: React.FC = () => {
  const userId = localStorage.getItem("userId") as string;
  const { t } = useLanguageStore();
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
        header: t("transactions.headers.description"),
        accessorKey: "description",
      },
      {
        id: "date",
        header: t("transactions.headers.date"),
        accessorKey: "date",
      },
      {
        id: "category",
        header: t("transactions.headers.category"),
        accessorKey: "category.name",
      },
      {
        id: "amount",
        header: t("transactions.headers.amount"),
        accessorKey: "amount",
      },

      {
        id: "type",
        header: t("transactions.headers.type"),
        accessorKey: "type",
      },
      {
        id: "paymentMethod",
        header: t("transactions.headers.paymentMethod"),
        accessorKey: "payment_method.name",
      },
    ],
    []
  );

  return (
    <main className="col-span-12 lg:col-span-10 pt-3 lg:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <ToastContainer />
      <header className="flex flex-col md:flex-row mb-4 gap-2 md:gap-5 md:items-center">
        <h1 className="text-lg lg:text-xl font-outfit text-neutral-700 dark:text-neutral-400">
          {t("transactions.title")}
        </h1>
        <LinkButton className="primary" to="/account/transaction">
          {t("transactions.cta")}
        </LinkButton>
      </header>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          data={transactions}
          handleDeleteRow={handleDeleteConfirmation}
          setData={() => {}}
        />
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={t("transactions.deleteModal.title")}
        >
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 px-4 py-2 rounded-md"
            >
              {t("transactions.deleteModal.cancel")}
            </button>
            <button
              onClick={() => deleteRow(selectedRow)}
              className="bg-rose-500 hover:bg-rose-600 text-neutral-100 px-4 py-2 rounded-md"
            >
              {t("transactions.deleteModal.confirm")}
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default TransactionsPage;
