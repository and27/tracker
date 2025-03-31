import BarChartDataProvider from "../components/Sections/BarChartDataProvider";
import HeatMapDataProvider from "../components/Sections/HeatMapDataProvider";
import { useLanguageStore } from "../store/languageStore";
import InsightSection from "../components/Insights/InsightsSection";
import AreaChartDataProvider from "../components/Sections/AreaChartDataProvider";
import { useEffect } from "react";
import { useInsightStore } from "../store/insightStore";

const ReportsPage = () => {
  const { t } = useLanguageStore();
  const { insights, getInsights } = useInsightStore();

  useEffect(() => {
    getInsights();
  }, [getInsights, insights]);

  return (
    <main className="col-span-12 lg:col-span-10 px-4 md:px-8 pt-10">
      <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
        {t("reports.title")}
      </h1>

      <div className="flex items-center gap-5 mb-10">
        <h3 className="text-2xl uppercase">{t("reports.barChartTitle")}</h3>
        <InsightSection type="categorySpending" />
      </div>
      <div className="mb-[8rem] flex flex-col gap-5">
        <div style={{ minHeight: "360px" }}>
          <BarChartDataProvider />
        </div>
      </div>

      <div className="flex items-center gap-5 mb-10">
        <h3 className="text-2xl uppercase">{t("reports.lineChartTitle")}</h3>
        <InsightSection type="monthlyComparison" />
      </div>
      <div className="mb-[8rem] flex flex-col gap-5">
        <div style={{ height: "400px" }}>
          <AreaChartDataProvider />
        </div>
      </div>

      <div className="flex items-center gap-5 mb-10">
        <h3 className="text-2xl uppercase my-10">
          {t("reports.heatMapTitle")}
        </h3>
        <InsightSection type="projections" />
      </div>
      <div className="mb-20 flex flex-col gap-5">
        <div style={{ height: "500px" }}>
          <HeatMapDataProvider />
        </div>
      </div>
    </main>
  );
};

export default ReportsPage;
