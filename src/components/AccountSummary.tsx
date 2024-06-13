import PieChart from "./PieChart";

type SummaryCardProps = {
  title: string;
  value: string;
};

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className="shadow p-5 bg-white dark:bg-neutral-800 rounded">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};

const AccountSummary = () => {
  return (
    <section className="col-span-4 p-6 bg-neutral-50 dark:bg-neutral-900">
      <h2 className="text-2xl lg:text-3xl mb-6 font-outfit">Account Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Income" value="$2,000" />
        <SummaryCard title="Expense" value="$1,000" />
        <SummaryCard title="Balance" value="$1,000" />
        <SummaryCard title="Total Transactions" value="10" />
      </div>

      <div style={{ height: "500px" }}>
        <PieChart />
      </div>
    </section>
  );
};

export default AccountSummary;
