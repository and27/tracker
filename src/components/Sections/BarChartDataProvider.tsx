import { useEffect, useState } from "react";
import BarChart from "../Graphs/BarChart";
import { getTransactions } from "../../utils/api/transactions";
import { EnrichedTransaction } from "./PieChartDataProvider";

export type BarChartDataType = {
  label: string;
  value: number;
};

const BarChartDataProvider = () => {
  const [data, setData] = useState<BarChartDataType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data: transactions, error } = await getTransactions({
        userId: user,
      });

      if (error) {
        console.error(error);
        return;
      }

      if (transactions) {
        const barData = (
          transactions as unknown as EnrichedTransaction[]
        ).reduce(
          (acc: BarChartDataType[], transaction: EnrichedTransaction) => {
            const existingCategory = acc.find(
              (category) => category.label === transaction.categoryName
            );

            if (existingCategory) {
              existingCategory.value += transaction.amount;
            } else {
              acc.push({
                label: transaction.categoryName || "unknown",
                value: transaction.amount,
              });
            }

            return acc;
          },
          []
        );

        setData(barData);
      }
    };

    fetchTransactions();
  }, []);

  return <BarChart data={data} />;
};

export default BarChartDataProvider;
