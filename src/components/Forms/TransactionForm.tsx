import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { createTransaction } from "../../utils/supabaseDB";
import {
  fetchCategories,
  fetchPaymentMethods,
  handleError,
  prepareTransactionData,
} from "../../services/transactionService";
import useAITransaction from "../../hooks/useAITransaction";
import { useLanguageStore } from "../../store/languageStore";
import Spinner from "../Spinner";
import { getHappyMoneyQuote } from "../../utils/happyMoneyGenerator";
import Modal from "../Modals/Modal";
import GeneratedTransaction from "../GeneratedTransaction";

const TransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [paymentMehods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [userInput, setUserInput] = useState("");
  const [quote, setQuote] = useState("");

  const {
    generatedTransactions,
    processTransactions,
    loading,
    clearTransaction,
    removeTransaction,
  } = useAITransaction();
  const { t } = useLanguageStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  const handleProcessTransactions = async () => {
    try {
      if (!userInput) {
        toast.error("Please enter a description.");
        return;
      }
      await processTransactions(userInput);
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    try {
      const preparedTransaction = prepareTransactionData(data);
      const { error } = await createTransaction(preparedTransaction);
      if (error) {
        throw error;
      }
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

  useEffect(() => {
    setQuote(getHappyMoneyQuote());
  }, [loading]);

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => setShowForm(false)}
          className={`border-0 ${
            !showForm && "border-b-4"
          } border-indigo-500 px-5 mt-2 rounded dark:border-indigo-400 bg-neutral-200 dark:bg-neutral-800`}
        >
          {t("transactions.form.autoEntry")}
        </button>
        <button
          className={`border-0 ${
            showForm && "border-b-4"
          } border-indigo-500 px-5 mt-2 rounded dark:border-indigo-400 bg-neutral-200 dark:bg-neutral-800`}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          {t("transactions.form.manualEntry")}
        </button>
      </div>
      {!showForm && (
        <div className="text-white pt-10 rounded-lg max-w-96">
          <label className="flex flex-col text-neutral-700 dark:text-neutral-200">
            {t("transactions.form.autoDetails")} *
            <span className="sr-only">Required field</span>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t("transactions.form.autoPlaceholder")}
              className="w-full mt-2 border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
              rows={4}
            />
          </label>
          <div className="flex justify-between my-4">
            <Button onClick={handleProcessTransactions} type="button">
              {loading
                ? `✨ ${t("transactions.form.loading")}`
                : t("transactions.form.generate")}
            </Button>
          </div>

          {generatedTransactions && generatedTransactions.length > 0 && (
            <Modal
              isOpen={true}
              onClose={clearTransaction}
              title="Transaction Summary"
            >
              {generatedTransactions.map((transaction, index) => (
                <GeneratedTransaction
                  key={index}
                  generatedTransaction={transaction}
                  handleClick={() => {
                    onSubmit(transaction);
                    removeTransaction(transaction);
                    setUserInput("");
                  }}
                />
              ))}
            </Modal>
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
      {loading && (
        <div className="flex flex-col fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
          <p>💸 {quote}</p>
        </div>
      )}
    </>
  );
};

export default TransactionForm;
