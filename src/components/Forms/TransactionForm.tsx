import { useEffect, useRef, useState } from "react";
import { Transaction } from "../../pages/TransactionsPage";
import { Link } from "react-router-dom";
import { createTransaction, getCategories } from "../../utils/supabaseDB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";

const TransactionForm = () => {
  const [transaction, setTransaction] = useState<Transaction>({
    transactionId: "",
    description: "",
    date: "",
    category: "",
    amount: 0,
    type: "income",
    paymentMethod: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const paymentMehods = ["cash", "card", "bank transfer", "paypal"];

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getCategories();
      console.log(data);
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCategories(data.map((category) => category.name));
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await createTransaction(transaction);
    if (error) {
      console.error(error);
    } else {
      console.log("created successfully");
      formRef.current?.reset();
      toast.success("Transaction created successfully!");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        ref={formRef}
      >
        <label
          htmlFor="description"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Description
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="text"
            name="description"
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="date"
          className="flex flex-col text-gray-700 dark:text-neutral-200 "
        >
          Date
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="date"
            name="date"
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="category"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Category
          <select
            className="border border-gray-300 p-2 rounded-md"
            name="category"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="amount"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Amount
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="number"
            name="amount"
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="type"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Type
          <select
            className="border border-gray-300 p-2 rounded-md"
            name="type"
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label
          htmlFor="paymentMethod"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Payment Method
          <select
            className="border border-gray-300 p-2 rounded-md"
            name="paymentMethod"
            onChange={handleChange}
          >
            {paymentMehods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3">
          <Button>Add transaction</Button>
          <Link to="/transactions">
            <button
              type="reset"
              className="bg-white border border-gray-400 px-6 text-gray-500 mt-5 rounded"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;
