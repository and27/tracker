import Subtitle from "./Subtitle";

type SummaryCardProps = {
  title: string;
  value: string;
};

const SummaryCard = ({ title, value }: SummaryCardProps) => (
  <div className="shadow-md dark:shadow-none p-5 bg-neutral-100/80 dark:bg-neutral-800/50 rounded-lg flex flex-col gap-1">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

type Props = {
  income: number;
  expense: number;
  transactions: number;
  t: (key: string) => string;
};

const AccountSummary = ({ income, expense, transactions, t }: Props) => {
  if (transactions === 0) return null;

  return (
    <section className="col-span-5 max-w-4xl min-h-[300px]">
      <Subtitle title={t("overview.accountSummary")} />
      <div className="grid grid-cols-2 gap-4 md:max-w-[80%] mt-3">
        <SummaryCard title={t("overview.income")} value={income.toString()} />
        <SummaryCard title={t("overview.expense")} value={expense.toString()} />
        <SummaryCard
          title={t("overview.balance")}
          value={(income - expense).toString()}
        />
        <SummaryCard
          title={t("overview.totalTransactions")}
          value={transactions.toString()}
        />
      </div>
    </section>
  );
};

export default AccountSummary;
