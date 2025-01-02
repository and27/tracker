import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { Transaction } from "../../data/types/transactions";
import { createTransaction } from "../../utils/api/transactions";
import { getCategories } from "../../utils/api/categories";
import { Category } from "../../data/types/categories";
import { getPaymentMethods } from "../../utils/api/paymentMethods";
import { PaymentMethod } from "../../data/types/paymentMethods";

const TransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMehods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    const user_id = localStorage.getItem("userId") as string;
    data.userId = user_id;
    if (typeof data.amount === "string") data.amount = parseInt(data.amount);
    if (typeof data.categoryId === "string")
      data.categoryId = parseInt(data.categoryId);
    if (typeof data.paymentMethodId === "string")
      data.paymentMethodId = parseInt(data.paymentMethodId);

    const { error } = await createTransaction(data);
    if (error) {
      console.log(error);
    } else {
      formRef.current?.reset();
      toast.success("Transaction created successfully!");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getCategories("system");
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPaymentMehods = async () => {
      const methods = await getPaymentMethods();
      setPaymentMethods(methods.data || []);
    };

    fetchPaymentMehods();
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
            {...register("categoryId", { required: true })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
            {...register("paymentMethodId", { required: true })}
          >
            {paymentMehods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-3">
          <Button type="submit">Add transaction</Button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;
