import PieChartDataProvider from "./PieChartDataProvider";
import Subtitle from "./Subtitle";

type SummaryCardProps = {
  title: string;
  value: string;
};

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className="shadow p-5 bg-white dark:bg-neutral-800/50 rounded">
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};

const AccountSummary = () => {
  return (
    <section className="col-span-4 bg-neutral-50 dark:bg-neutral-900">
      <Subtitle title="Account summary" />
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Income" value="$2,000" />
        <SummaryCard title="Expense" value="$1,000" />
        <SummaryCard title="Balance" value="$1,000" />
        <SummaryCard title="Total Transactions" value="10" />
      </div>

      <div className="mt-10 overflow-scroll">
        <Subtitle title="Expenses by category" />
        <div className="lg:w-[70%] w-[110%]" style={{ height: "500px" }}>
          <PieChartDataProvider />
        </div>
      </div>
    </section>
  );
};

export default AccountSummary;
