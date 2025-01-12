import LineChartDataProvider from "../components/Sections/LineChartDataProvider";
import BarChartDataProvider from "../components/Sections/BarChartDataProvider";
import HeatMapDataProvider from "../components/Sections/HeatMapDataProvider";

const ReportsPage = () => {
  return (
    <main className="col-span-12 lg:col-span-10 px-8 pt-10">
      <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
        Reports
      </h1>
      <h3>What categories are you spending on?</h3>
      <div style={{ height: "500px" }}>
        <BarChartDataProvider />
      </div>

      <h3>How much are you spending?</h3>
      <div style={{ height: "500px" }}>
        <LineChartDataProvider />
      </div>

      <h3 className="mt-10">What are your top expenses?</h3>
      <div style={{ height: "500px" }}>
        <HeatMapDataProvider />
      </div>
    </main>
  );
};

export default ReportsPage;
