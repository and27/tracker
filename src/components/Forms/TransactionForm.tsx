import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { createTransaction, getCategories } from "../../utils/supabaseDB";
import { TransactionType } from "../../pages/TransactionsPage";
import Button from "../Button";

const TransactionForm = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const paymentMehods = ["cash", "card", "bank transfer", "paypal"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>();

  const onSubmit: SubmitHandler<TransactionType> = async (data) => {
    const { error } = await createTransaction(data);
    if (error) {
    } else {
      formRef.current?.reset();
      toast.success("Transaction created successfully!");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getCategories();
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

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        ref={formRef}
      >
        <div>
          <label
            htmlFor="description"
            className="flex flex-col text-neutral-700 dark:text-neutral-200"
          >
            Description
            <input
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              type="text"
              {...register("description", { required: true })}
            />
          </label>
          {errors.description && (
            <span className="text-rose-600 text-sm ">
              This field is required
            </span>
          )}
        </div>
        <label
          htmlFor="date"
          className="flex flex-col text-gray-700 dark:text-neutral-200 "
        >
          Date
          <input
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("date", { required: true })}
          />
        </label>
        <label
          htmlFor="category"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Category
          <select
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            {...register("category", { required: true })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div>
          <label
            htmlFor="amount"
            className="flex flex-col text-gray-700 dark:text-neutral-200"
          >
            Amount
            <input
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              type="number"
              {...register("amount", { required: true })}
            />
          </label>
          {errors.amount && (
            <span className="text-rose-600 text-sm">
              This field is required
            </span>
          )}
        </div>
        <label
          htmlFor="type"
          className="flex flex-col text-gray-700 dark:text-neutral-200"
        >
          Type
          <select
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            {...register("type", { required: true })}
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
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            {...register("paymentMethod", { required: true })}
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
