import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Subtitle from "../Subtitle";
import TransactionItem from "../TransactionItem";
import { getLastTransactions } from "../../utils/supabaseDB";
import { useLanguageStore } from "../../store/languageStore";

const LastTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const noTransactions = !transactions || transactions.length === 0;

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
      {noTransactions ? (
        <p>No transactions</p>
      ) : (
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
          <Button
            className="mt-4 w-full"
            onClick={() => navigate("/account/transactions")}
          >
            {t("overview.viewAll")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LastTransactions;
