import { useEffect, useState } from "react";
import Subtitle from "../Subtitle";
import TransactionOverviewItem from "../TransactionOverviewItem";
import { getLastTransactions } from "../../utils/supabaseDB";

const TransactionOverviewList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data, error } = await getLastTransactions({ user, limit: 7 });
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
        <ul className="grid grid-cols-1 gap-4">
          {transactions?.map((transaction) => (
            <TransactionOverviewItem
              key={transaction.id}
              id={parseInt(transaction.id)}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              category={transaction.category.name || "unknown"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionOverviewList;
