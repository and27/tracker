import { useEffect, useState } from "react";
import TransactionOverview, {
  ITransactionOverview,
} from "./TransactionOverview";
import { getTransactions } from "../utils/supabaseDB";

const TransactionOverviewList = () => {
  const [transactions, setTransactions] = useState<ITransactionOverview[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await getTransactions();
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setTransactions(data);
        console.log(data);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <div className="col-span-2 mr-6">
      <h2 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-400">
        Last transactions
      </h2>
      <div className="shadow bg-white dark:bg-neutral-800 p-8 rounded">
        <ul className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <TransactionOverview
              key={transaction.id}
              id={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionOverviewList;
