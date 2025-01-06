import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import { getTransactions } from "../../utils/api/transactions";
import { EnrichedTransaction } from "../PieChartDataProvider";

type LineChartDataType = {
  id: string;
  color: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

const LineChartDataProvider = () => {
  const [data, setData] = useState<LineChartDataType>([
    {
      id: "japan",
      color: "hsl(11, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 69,
        },

        {
          x: "car",
          y: 257,
        },
        {
          x: "moto",
          y: 62,
        },
      ],
    },
  ]);

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
          (acc: LineChartDataType, transaction: EnrichedTransaction) => {
            const existingCategory = acc.find(
              (category) => category.id === transaction.categoryName
            );
            if (existingCategory) {
              existingCategory.data.push({
                x: transaction.date,
                y: transaction.amount,
              });
            } else {
              acc.push({
                id: transaction.categoryName || "unknown",
                color: "hsl(11, 70%, 50%)",
                data: [
                  {
                    x: transaction.date,
                    y: transaction.amount,
                  },
                ],
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

  return <LineChart data={data} />;
};

export default LineChartDataProvider;
