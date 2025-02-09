import { useInsightStore } from "../store/insightStore";
import SpendingPatterns from "../components/Insights/SpendingPatterns";
import BudgetOptimization from "../components/Insights/BudgetOptimization";
import insightsMock from "../data/mocks/insightsMock";
import PredictionsTrends from "../components/Insights/PredictionTrends";
import { useEffect } from "react";

const InsightsPage = () => {
  const { insights, getInsights } = useInsightStore();
  console.log(insights);

  useEffect(() => {
    getInsights();
  }, [getInsights]);

  return (
    <main className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
          Análisis Inteligente de tus Finanzas
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded text-white"
          onClick={() => getInsights(true)}
        >
          🔄 Actualizar Insights
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <SpendingPatterns data={insightsMock.spendingPatterns} />
        <BudgetOptimization data={insightsMock.budgetOptimization} />
        <PredictionsTrends data={insightsMock.predictions} />
      </div>
    </main>
  );
};

export default InsightsPage;
