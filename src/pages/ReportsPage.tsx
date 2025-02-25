import LineChartDataProvider from "../components/Sections/LineChartDataProvider";
import BarChartDataProvider from "../components/Sections/BarChartDataProvider";
import HeatMapDataProvider from "../components/Sections/HeatMapDataProvider";
import { useLanguageStore } from "../store/languageStore";

const ReportsPage = () => {
  const { t } = useLanguageStore();
  return (
    <main className="col-span-12 lg:col-span-10 px-4 md:px-8 pt-10">
      <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
        {t("reports.title")}
      </h1>
      <h3>{t("reports.barChartTitle")}</h3>
      <div style={{ height: "500px" }}>
        <BarChartDataProvider />
      </div>

      <h3>{t("reports.lineChartTitle")}</h3>
      <div style={{ height: "500px" }}>
        <LineChartDataProvider />
      </div>

      <h3 className="mt-10">{t("reports.heatMapTitle")}</h3>
      <div style={{ height: "500px" }}>
        <HeatMapDataProvider />
      </div>
    </main>
  );
};

export default ReportsPage;
