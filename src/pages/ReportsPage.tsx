import PieChartDataProvider from "../components/PieChartDataProvider";
import LineChartDataProvider from "../components/Sections/LineChartDataProvider";

const ReportsPage = () => {
  return (
    <main className="col-span-12 lg:col-span-10 px-8 pt-10">
      <h1 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
        Reports
      </h1>
      <h3>What categories are you spending on?</h3>
      <div
        style={{ height: "500px" }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <PieChartDataProvider />
      </div>

      <div style={{ height: "500px" }}>
        <LineChartDataProvider />
      </div>
    </main>
  );
};

export default ReportsPage;
