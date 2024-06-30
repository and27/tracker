import { useEffect, useState } from "react";
import PieChart, { PieChartDataType } from "./PieChart";
import { getTransactions } from "../utils/supabaseDB";
import { TransactionType } from "../pages/TransactionsPage";

const PieChartDataProvider = () => {
  const [data, setData] = useState<PieChartDataType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: transactions, error } = await getTransactions();
      if (error) {
        console.error(error);
        return;
      }
      if (transactions) {
        const data = transactions.reduce(
          (acc: PieChartDataType[], transaction: TransactionType) => {
            const existingCategory = acc.find(
              (category) => category.id === transaction.category
            );
            if (existingCategory) {
              existingCategory.value += transaction.amount;
            } else {
              acc.push({
                id: transaction.category,
                label: transaction.category,
                value: transaction.amount,
              });
            }
            return acc;
          },
          []
        );
        setData(data);
      }
    };
    fetchTransactions();
  }, []);

  return <PieChart data={data} />;
};

export default PieChartDataProvider;
