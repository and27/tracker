import PieChart from "../components/PieChart";
import SidebarMenu from "../components/SidebarMenu";

const ReportsPage = () => {
  return (
    <div className="grid grid-cols-12">
      <SidebarMenu />
      <main className="col-span-10 p-6">
        <div style={{ height: "500px" }}>
          <PieChart />
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
