import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { createTransaction } from "../../utils/supabaseDB";
import {
  fetchCategories,
  fetchPaymentMethods,
  handleError,
  transformTransactionData,
} from "../../services/transactionService";
import useAITransaction from "../../hooks/useAITransaction";
import { useLanguageStore } from "../../store/languageStore";

interface GeneratedTransactionProps {
  generatedTransaction: {
    description: string;
    date: string;
    amount: number;
    category: { name: string };
    paymentMethod: { name: string };
    type: string;
  };
  handleClick: () => void;
}

const GeneratedTransaction: React.FC<GeneratedTransactionProps> = ({
  generatedTransaction,
  handleClick,
}) => {
  return (
    <div className="p-4 border border-neutral-500 rounded-lg shadow-md ">
      <h2 className="text-lg font-semibold mb-2">📌 Transaction Summary</h2>
      <p>
        📝 <strong>Description:</strong> {generatedTransaction?.description}
      </p>
      <p>
        📅 <strong>Date:</strong> {generatedTransaction?.date}
      </p>
      <p>
        💰 <strong>Amount:</strong> ${generatedTransaction?.amount.toFixed(2)}
      </p>
      <p>
        🏷️ <strong>Category:</strong> {generatedTransaction?.category.name}
      </p>
      <p>
        💳 <strong>Payment Method:</strong>{" "}
        {generatedTransaction?.paymentMethod.name}
      </p>
      <p>
        📊 <strong>Type:</strong>{" "}
        {generatedTransaction?.type === "income" ? "Income 💵" : "Expense 💸"}
      </p>
      <button
        className="bg-indigo-600 hover:bg-green-600 py-2 px-4 mt-2 rounded"
        onClick={handleClick}
      >
        Confirm Transaction
      </button>
    </div>
  );
};

const TransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [paymentMehods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [userInput, setUserInput] = useState("");
  const { generatedTransaction, processTransaction, loading } =
    useAITransaction();
  const { t } = useLanguageStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    try {
      const transformedData = transformTransactionData(data);
      await createTransaction(transformedData);
      formRef.current?.reset();
      toast.success("Transaction created successfully!", {
        position: "top-center",
      });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [categoriesData, paymentMethodsData] = await Promise.all([
          fetchCategories(),
          fetchPaymentMethods(),
        ]);
        setCategories(categoriesData);
        setPaymentMethods(paymentMethodsData);
      } catch (error) {
        handleError(error);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex gap-4">
        <button
          onClick={() => setShowForm(false)}
          className={`border-0 ${
            !showForm && "border-b-4"
          } border-indigo-500 px-5 mt-2 rounded dark:border-indigo-400 bg-neutral-100 dark:bg-neutral-800`}
        >
          {t("transactions.form.autoEntry")}
        </button>
        <button
          className={`border-0 ${
            showForm && "border-b-4"
          } border-indigo-500 px-5 mt-2 rounded dark:border-indigo-400 bg-neutral-100 dark:bg-neutral-800`}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {t("transactions.form.manualEntry")}
        </button>
      </div>
      {!showForm && (
        <div className="text-white pt-10 rounded-lg shadow-lg w-96">
          <label className="flex flex-col text-neutral-700 dark:text-neutral-200">
            {t("transactions.form.autoDetails")} *
            <span className="sr-only">Required field</span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t("transactions.form.autoPlaceholder")}
              className="w-full mt-2 border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
            />
          </label>
          <div className="flex justify-between my-4">
            <Button onClick={() => processTransaction(userInput)}>
              {loading
                ? `✨ ${t("transactions.form.loading")}`
                : t("transactions.form.generate")}
            </Button>
          </div>
          {generatedTransaction && (
            <GeneratedTransaction
              generatedTransaction={generatedTransaction}
              handleClick={() => {
                onSubmit(generatedTransaction);
              }}
            />
          )}
        </div>
      )}
      {showForm && (
        <form
          aria-label="Transaction form"
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
          className={`flex flex-col gap-4 mt-10`}
          ref={formRef}
        >
          <div>
            <label className="flex flex-col text-neutral-700 dark:text-neutral-200">
              {t("transactions.form.description")} *
              <span className="sr-only">Required field</span>
              <input
                className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
                type="text"
                {...register("description", { required: true })}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
              />
            </label>
            {errors.description && (
              <span id="description-error" className="text-rose-600 text-sm ">
                {t("transactions.form.requiredError")}
              </span>
            )}
          </div>
          <label className="flex flex-col text-gray-700 dark:text-neutral-200 ">
            {t("transactions.form.date")} *
            <span className="sr-only">Required field</span>
            <input
              className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              {...register("date", { required: true })}
            />
          </label>
          <div>
            <label className="flex flex-col text-gray-700 dark:text-neutral-200">
              {t("transactions.form.category")} *
              <span className="sr-only">Required field</span>
              <select
                className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
                {...register("category.id", { required: true })}
                aria-describedby={
                  errors.category?.id ? "category-error" : undefined
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

            {errors.category?.id && (
              <span id="category-error" className="text-rose-600 text-sm ">
                {t("transactions.form.requiredError")}
              </span>
            )}
          </div>
          <div>
            <label className="flex flex-col text-gray-700 dark:text-neutral-200">
              {t("transactions.form.amount")} *
              <span className="sr-only">Required field</span>
              <input
                className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
                type="number"
                {...register("amount", { required: true })}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
            </label>
            {errors.amount && (
              <span id="amount-error" className="text-rose-600 text-sm">
                {t("transactions.form.requiredError")}
              </span>
            )}
          </div>
          <label className="flex flex-col text-gray-700 dark:text-neutral-200">
            {t("transactions.form.type")} *
            <span className="sr-only">Required field</span>
            <select
              className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
              {...register("type", { required: true })}
            >
              <option value="income">{t("transactions.income")}</option>
              <option value="expense">{t("transactions.expense")}</option>
            </select>
          </label>
          <div>
            <label className="flex flex-col text-gray-700 dark:text-neutral-200">
              {t("transactions.form.paymentMethod")} *
              <span className="sr-only">Required field</span>
              <select
                className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
                {...register("paymentMethod.id", { required: true })}
                aria-describedby={
                  errors.paymentMethod ? "payment-method-error" : undefined
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
            {errors.paymentMethod && (
              <span
                id="payment-method-error"
                className="text-rose-600 text-sm "
              >
                {t("transactions.form.requiredError")}
              </span>
            )}
          </div>
          <div className="flex ap-3">
            <Button type="submit">{t("transactions.form.cta")}</Button>
          </div>
        </form>
      )}
    </>
  );
};

export default TransactionForm;
