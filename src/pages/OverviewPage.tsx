import AccountSummary from "../components/AccountSummary";
import InsightsBanner from "../components/InsightsBanner";
import { Footer } from "../components/Sections/Footer";
import LastTransactions from "../components/Sections/LastTransactions";
import { useInsightStore } from "../store/insightStore";
import { useLanguageStore } from "../store/languageStore";

function OverviewPage() {
  const { t } = useLanguageStore();
  const { insights } = useInsightStore();

  if (!insights) return null;

  const firstInsight =
    insights?.spendingPatterns?.length > 0
      ? insights.spendingPatterns[insights.spendingPatterns.length - 1]?.d
      : null;

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <main className="p-4 lg:p-10">
        <h1 className="text-2xl lg:text-3xl mb-6 font-outfit">
          {t("overview.title")}
        </h1>
        <InsightsBanner insight={firstInsight as string} />
        <div className="md:grid md:grid-cols-6 gap-6">
          <AccountSummary />
          <LastTransactions />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OverviewPage;
