import { useEffect, useState } from "react";
import PieChartDataProvider from "./PieChartDataProvider";
import Subtitle from "./Subtitle";
import { getTransactions } from "../utils/api/transactions";

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
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const setupAccountInfo = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data, error } = await getTransactions({ userId: user });
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        const income = data
          .filter((transaction) => transaction.type === "income")
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        const expense = data
          .filter((transaction) => transaction.type === "expense")
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setTotalTransactions(data.length);
      }
    };
    setupAccountInfo();
  }, []);

  return (
    <section className="col-span-4 bg-neutral-50 dark:bg-neutral-900">
      <Subtitle title="Account summary" />
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Income" value={totalIncome.toString()} />
        <SummaryCard title="Expense" value={totalExpense.toString()} />
        <SummaryCard
          title="Balance"
          value={(totalIncome - totalExpense).toString()}
        />
        <SummaryCard
          title="Total Transactions"
          value={totalTransactions.toString()}
        />
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
