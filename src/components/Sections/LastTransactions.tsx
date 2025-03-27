import { useEffect, useState } from "react";
import Subtitle from "../Subtitle";
import TransactionItem from "../TransactionItem";
import { getLastTransactions } from "../../utils/supabaseDB";
import { useLanguageStore } from "../../store/languageStore";
import LinkButton from "../LinkButton";

const LastTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
    transactions.length > 0 && (
      <div className="col-span-3">
        <div className="flex items-center justify-between mb-4">
          <Subtitle title={t("overview.lastTransactions")} />
          <LinkButton className="primary" to="/account/transaction">
            {t("overview.registerTransaction")}
          </LinkButton>
        </div>
        <div className="pt-7 shadow-md dark:shadow-none bg-transparent dark:bg-neutral-800/50 pt-4 p-8 rounded-lg">
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
          <LinkButton className="mt-4 w-full" to="/account/transactions">
            {t("overview.viewAll")}
          </LinkButton>
        </div>
      </div>
    )
  );
};

export default LastTransactions;
