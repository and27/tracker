import { useState } from "react";
import { Transaction } from "../pages/TransactionsPage";
import { Link } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(transaction);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="transactionId" className="flex flex-col text-gray-700">
        Transaction ID
        <input
          className="border border-gray-300 p-2 rounded-md"
          type="text"
          name="transactionId"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description" className="flex flex-col text-gray-700">
        Description
        <input
          className="border border-gray-300 p-2 rounded-md"
          type="text"
          name="description"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="date" className="flex flex-col text-gray-700 ">
        Date
        <input
          className="border border-gray-300 p-2 rounded-md"
          type="date"
          name="date"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="category" className="flex flex-col text-gray-700">
        Category
        <input
          className="border border-gray-300 p-2 rounded-md"
          type="text"
          name="category"
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-teal-500 text-white px-5 mt-5 rounded"
        >
          Add transaction
        </button>
        <Link to="/transactions">
          <button
            type="reset"
            className="bg-white border border-gray-500 px-5 text-gray-500 p-2 mt-5 rounded"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default TransactionForm;