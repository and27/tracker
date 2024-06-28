import PieChartDataProvider from "../components/PieChartDataProvider";

const ReportsPage = () => {
  return (
    <main className="col-span-10 p-6">
      <div style={{ height: "500px" }}>
        <PieChartDataProvider />
      </div>
    </main>
  );
};

export default ReportsPage;
