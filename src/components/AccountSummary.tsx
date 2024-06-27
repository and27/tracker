import PieChartDataProvider from "./PieChartDataProvider";

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
    <section className="col-span-4 bg-neutral-50 dark:bg-neutral-900">
      <h2 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-400">
        Account Summary
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Income" value="$2,000" />
        <SummaryCard title="Expense" value="$1,000" />
        <SummaryCard title="Balance" value="$1,000" />
        <SummaryCard title="Total Transactions" value="10" />
      </div>

      <div style={{ height: "500px" }}>
        <PieChartDataProvider />
      </div>
    </section>
  );
};

export default AccountSummary;
