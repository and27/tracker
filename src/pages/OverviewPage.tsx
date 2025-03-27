import AccountSummary from "../components/AccountSummary";
import { Footer } from "../components/Sections/Footer";
import LastTransactions from "../components/Sections/LastTransactions";
import { useInsightStore } from "../store/insightStore";
import { useLanguageStore } from "../store/languageStore";
import WelcomeModal from "../components/Modals/WelcomeModal";
import FirstSteps from "../components/FirstSteps";

function OverviewPage() {
  const { t } = useLanguageStore();
  const { insights } = useInsightStore();
  const user = localStorage.getItem("userId");

  if (!insights) return null;

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <WelcomeModal userId={user || ""} />
      <main className="p-4 lg:p-10 h-full flex flex-col justify-between gap-10 mb-10">
        <h1 className="text-2xl lg:text-3xl mb-3   font-outfit">
          {t("overview.title")}
        </h1>
        <FirstSteps />
        {/* <InsightsBanner insight={firstInsight as string} /> */}
        <div className="md:grid md:grid-cols-8 gap-6 mt-10">
          <AccountSummary />
          <LastTransactions />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OverviewPage;
