import TransactionForm from "../components/Forms/TransactionForm";
import { useLanguageStore } from "../store/languageStore";

const TransactionFormPage = () => {
  const { t } = useLanguageStore();
  return (
    <main className="relative col-span-12 lg:col-span-10 px-4 md:px-8 py-10 lg:w-1/2 min-h-screen">
      <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
        {t("transactions.form.title")}
      </h1>
      <TransactionForm />
    </main>
  );
};

export default TransactionFormPage;
