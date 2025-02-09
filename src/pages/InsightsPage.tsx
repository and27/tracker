import { useEffect } from "react";
import { useInsightStore } from "../store/insightStore";

const InsightsPage = () => {
  const { insights, getInsights } = useInsightStore();

  useEffect(() => {
    getInsights();
  }, [getInsights]);

  return (
    <main className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
          Análisis inteligente de tus finanzas
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded text-white"
          onClick={() => getInsights(true)} // Force refresh si el usuario lo quiere
        >
          🔄 Actualizar Insights
        </button>
      </div>

      {insights.length === 0 ? (
        <p className="text-neutral-400">Cargando insights...</p>
      ) : (
        <ul>
          {insights.map((insight, index) => (
            <li
              key={index}
              className="bg-white dark:bg-neutral-800 p-4 rounded-md mb-4"
            >
              <p>{insight}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default InsightsPage;
