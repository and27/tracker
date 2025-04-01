import AccountSummary from "../components/AccountSummary";
import { Footer } from "../components/Sections/Footer";
import LastTransactions from "../components/Sections/LastTransactions";
import { useLanguageStore } from "../store/languageStore";
import WelcomeModal from "../components/Modals/WelcomeModal";
import FirstSteps from "../components/FirstSteps";
import useHasTransaction from "../hooks/useHasTransaction";
import useHasBudget from "../hooks/useHasBudget";
import useFinancialProfile from "../hooks/useFinancialProfile";
import { useAccountSummary } from "../hooks/useAccountSummary";
import Spinner from "../components/Spinner";

function OverviewPage() {
  const { t } = useLanguageStore();
  const { isCompleted, loading: profileLoading } = useFinancialProfile();
  const { hasBudget, loading: budgetLoading } = useHasBudget();
  const { hasTransaction, loading: transactionLoading } = useHasTransaction();
  const {
    totalIncome,
    totalExpense,
    totalTransactions,
    loading: summaryLoading,
  } = useAccountSummary();

  const loading =
    profileLoading || budgetLoading || transactionLoading || summaryLoading;

  const allStepsCompleted = isCompleted && hasTransaction && hasBudget;
  const user = localStorage.getItem("userId");

  if (loading)
    return (
      <div className="flex col-span-12 lg:col-span-10 mx-auto justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-y-scroll">
      <WelcomeModal userId={user || ""} />

      <main className="p-4 lg:p-10 h-full flex flex-col gap-10 mb-10">
        <h1 className="text-2xl lg:text-3xl font-outfit mb-3">
          {t("overview.title")}
        </h1>

        {!allStepsCompleted && (
          <div className="animate-fade-in">
            <FirstSteps
              isCompleted={isCompleted ?? false}
              hasTransaction={hasTransaction}
              hasBudget={hasBudget}
            />
          </div>
        )}

        <div className="md:grid md:grid-cols-8 gap-6">
          <AccountSummary
            income={totalIncome}
            expense={totalExpense}
            transactions={totalTransactions}
            t={t}
          />
          <LastTransactions />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OverviewPage;
