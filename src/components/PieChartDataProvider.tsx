import { useEffect, useState } from "react";
import PieChart, { PieChartDataType } from "./PieChart";
import { getTransactions } from "../utils/api/transactions";
import { Transaction } from "../data/types/transactions";

const PieChartDataProvider = () => {
  const [data, setData] = useState<PieChartDataType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data: transactions, error } = await getTransactions(user);
      if (error) {
        console.error(error);
        return;
      }
      if (transactions) {
        const data = transactions.reduce(
          (acc: PieChartDataType[], transaction: Transaction) => {
            const existingCategory = acc.find(
              (category) => category.id === transaction.category
            );
            if (existingCategory) {
              existingCategory.value += transaction.amount;
            } else {
              acc.push({
                id: transaction.category || "unknown",
                label: transaction.category || "unknown",
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
