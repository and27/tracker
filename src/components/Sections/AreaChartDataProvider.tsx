import { useEffect, useState } from "react";
import AreaChart from "../Graphs/AreaChart"; // Tu componente basado en ResponsiveLine
import { EnrichedTransaction } from "./PieChartDataProvider";
import { getTransactions } from "../../utils/supabaseDB";
import { format } from "date-fns"; // para agrupar por fecha

type AreaChartDataType = {
  id: string;
  data: { x: string; y: number }[];
};

const AreaChartDataProvider = () => {
  const [data, setData] = useState<AreaChartDataType[]>([]);

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
        const parsed = transactions as EnrichedTransaction[];

        const grouped: Record<string, Record<string, number>> = {};

        parsed.forEach((tx) => {
          const date = format(new Date(tx.date), "MMM dd"); // ej: "Feb 08"
          const category = tx.category?.name || "unknown";

          if (!grouped[category]) grouped[category] = {};
          if (!grouped[category][date]) grouped[category][date] = 0;

          grouped[category][date] += tx.amount;
        });

        // Convertimos a formato esperado por Nivo
        const chartData: AreaChartDataType[] = Object.entries(grouped).map(
          ([category, valuesByDate]) => ({
            id: category,
            data: Object.entries(valuesByDate)
              .map(([date, value]) => ({ x: date, y: value }))
              .sort(
                (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
              ),
          })
        );

        setData(chartData);
      }
    };

    fetchTransactions();
  }, []);

  return <AreaChart data={data} />;
};

export default AreaChartDataProvider;
