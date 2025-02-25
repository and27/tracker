import { useInsightStore } from "../store/insightStore";
import SpendingPatterns from "../components/Insights/SpendingPatterns";
import PredictionsTrends from "../components/Insights/PredictionTrends";
import { useEffect } from "react";
import { useLanguageStore } from "../store/languageStore";

const InsightsPage = () => {
  const { insights, getInsights } = useInsightStore();
  const { t } = useLanguageStore();

  useEffect(() => {
    getInsights();
  }, [getInsights]);

  return (
    <main className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <header className="flex flex-col md:flex-row mb-4 gap-2 md:gap-5 md:items-center">
        <h1 className="text-lg lg:text-xl font-outfit text-neutral-700 dark:text-neutral-400">
          {t("insights.title")}
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded text-white"
          onClick={() => getInsights(true)}
        >
          {t("insights.cta")}
        </button>
      </header>

      <div className="flex flex-col gap-8">
        <SpendingPatterns data={insights.spendingPatterns} />
        <PredictionsTrends data={insights.predictions} />
      </div>
    </main>
  );
};

export default InsightsPage;
