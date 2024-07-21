import PieChartDataProvider from "./PieChartDataProvider";
import Subtitle from "./Subtitle";

type SummaryCardProps = {
  title: string;
  value: string;
};

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className="shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg flex flex-col gap-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
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

      <div className="mt-10 overflow-auto">
        <Subtitle title="Expenses by category" />
        <div className="lg:w-[70%] w-[110%]" style={{ height: "500px" }}>
          <PieChartDataProvider />
        </div>
      </div>
    </section>
  );
};

export default AccountSummary;
