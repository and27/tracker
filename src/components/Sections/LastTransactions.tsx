import { useEffect, useState } from "react";
import Subtitle from "../Subtitle";
import TransactionItem from "../TransactionItem";
import { getLastTransactions } from "../../utils/supabaseDB";
import { useLanguageStore } from "../../store/languageStore";
import Button from "../Button";

const LastTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { t } = useLanguageStore();

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
    <div className="col-span-2">
      <Subtitle title={t("overview.lastTransactions")} />
      <div className="bg-neutral-50 shadow-sm dark:bg-neutral-800/50 pt-4 p-8 rounded-lg">
        <ul className="grid grid-cols-1 gap-4">
          {transactions?.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={parseInt(transaction.id)}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              category={transaction.category.name || "unknown"}
            />
          ))}
        </ul>
        <Button
          className="mt-4 w-full"
          onClick={() => console.log("See all transactions")}
        >
          {t("overview.viewAll")}
        </Button>
      </div>
    </div>
  );
};

export default LastTransactions;
