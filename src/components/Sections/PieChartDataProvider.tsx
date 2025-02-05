import { useEffect, useState } from "react";
import PieChart, { PieChartDataType } from "../Graphs/PieChart";
import { getTransactions } from "../../utils/supabaseDB";

export interface EnrichedTransaction extends Transaction {
  categoryName: string;
  paymentMethodName: string;
}

const PieChartDataProvider = () => {
  const [data, setData] = useState<PieChartDataType[]>([]);

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
        const data = (transactions as unknown as EnrichedTransaction[]).reduce(
          (acc: PieChartDataType[], transaction: EnrichedTransaction) => {
            const existingCategory = acc.find(
              (category) => category.label === transaction.category.name
            );
            if (existingCategory) {
              existingCategory.value += transaction.amount;
            } else {
              acc.push({
                id: transaction.category.id.toString() || "unknown",
                label: transaction.category.name || "unknown",
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
