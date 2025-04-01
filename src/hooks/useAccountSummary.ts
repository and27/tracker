import { useEffect, useState } from "react";
import { getTransactions } from "../utils/supabaseDB";

export const useAccountSummary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupAccountInfo = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data, error } = await getTransactions({ userId: user });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (data) {
        const income = data
          .filter((transaction) => transaction.type === "income")
          .reduce((acc, t) => acc + t.amount, 0);

        const expense = data
          .filter((transaction) => transaction.type === "expense")
          .reduce((acc, t) => acc + t.amount, 0);

        setSummary({
          totalIncome: income,
          totalExpense: expense,
          totalTransactions: data.length,
        });
        setLoading(false);
      }
    };

    setupAccountInfo();
  }, []);

  return { ...summary, loading };
};
