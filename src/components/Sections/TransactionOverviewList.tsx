import { useEffect, useState } from "react";
import TransactionOverview from "../TransactionOverview";
import Subtitle from "../Subtitle";
import { getLastTransactions } from "../../utils/api/transactions";
import { Transaction } from "../../data/types/transactions";

const TransactionOverviewList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data, error } = await getLastTransactions(user, 5);
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setTransactions(data);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <div className="col-span-2 mr-6">
      <Subtitle title="Last transactions" />
      <div className="dark:bg-neutral-800/50 pt-4 dark:p-8 rounded-lg">
        <ul className="flex flex-col gap-2">
          {transactions.map((transaction) => (
            <TransactionOverview
              key={transaction.id}
              id={parseInt(transaction.id)}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              category={transaction.categoryId?.toString() || "unknown"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionOverviewList;
