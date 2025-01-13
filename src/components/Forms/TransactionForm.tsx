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
      toast.error(
        `An error occurred while creating the transaction: ${error}`,
        {
          position: "top-center",
        }
      );
    } else {
      formRef.current?.reset();
      toast.success("Transaction created successfully!", {
        position: "top-center",
      });
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
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
        className="flex flex-col gap-4"
        ref={formRef}
      >
        <div>
          <label className="flex flex-col text-neutral-700 dark:text-neutral-200">
            Description *<span className="sr-only">Required field</span>
            <input
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              type="text"
              {...register("description", { required: true })}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
          </label>
          {errors.description && (
            <span id="description-error" className="text-rose-600 text-sm ">
              This field is required
            </span>
          )}
        </div>
        <label className="flex flex-col text-gray-700 dark:text-neutral-200 ">
          Date *<span className="sr-only">Required field</span>
          <input
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("date", { required: true })}
          />
        </label>
        <div>
          <label className="flex flex-col text-gray-700 dark:text-neutral-200">
            Category *<span className="sr-only">Required field</span>
            <select
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              {...register("categoryId", { required: true })}
              aria-describedby={
                errors.categoryId ? "category-error" : undefined
              }
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          {errors.categoryId && (
            <span id="category-error" className="text-rose-600 text-sm ">
              This field is required
            </span>
          )}
        </div>
        <div>
          <label className="flex flex-col text-gray-700 dark:text-neutral-200">
            Amount *<span className="sr-only">Required field</span>
            <input
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              type="number"
              {...register("amount", { required: true })}
              aria-describedby={errors.amount ? "amount-error" : undefined}
            />
          </label>
          {errors.amount && (
            <span id="amount-error" className="text-rose-600 text-sm">
              This field is required
            </span>
          )}
        </div>
        <label className="flex flex-col text-gray-700 dark:text-neutral-200">
          Type *<span className="sr-only">Required field</span>
          <select
            className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
            {...register("type", { required: true })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <div>
          <label className="flex flex-col text-gray-700 dark:text-neutral-200">
            Payment Method *<span className="sr-only">Required field</span>
            <select
              className="border border-gray-300 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              {...register("paymentMethodId", { required: true })}
              aria-describedby={
                errors.paymentMethodId ? "payment-method-error" : undefined
              }
            >
              <option value="">Select a payment method</option>
              {paymentMehods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </label>
          {errors.paymentMethodId && (
            <span id="payment-method-error" className="text-rose-600 text-sm ">
              This field is required
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="submit">Add transaction</Button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;
