import { useEffect, useState } from "react";
import TransactionOverview, {
  ITransactionOverview,
} from "./TransactionOverview";
import { getLastTransactions } from "../utils/supabaseDB";

const TransactionOverviewList = () => {
  const [transactions, setTransactions] = useState<ITransactionOverview[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await getLastTransactions(8);
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
      <h2 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-400">
        Last transactions
      </h2>
      <div className="shadow bg-white dark:bg-neutral-800/50 p-8 rounded text-neutral-300">
        <ul className="flex flex-col gap-2">
          {transactions.map((transaction) => (
            <TransactionOverview
              key={transaction.id}
              id={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              category={transaction.category}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionOverviewList;
