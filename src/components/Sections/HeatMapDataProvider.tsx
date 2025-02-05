import { useEffect, useState } from "react";
import HeatMap from "../Graphs/HeatMap";
import { EnrichedTransaction } from "./PieChartDataProvider";
import { DefaultHeatMapDatum, HeatMapSerie } from "@nivo/heatmap";
import { getTransactions } from "../../utils/supabaseDB";

interface HeatmapCategory {
  id: string;
  data: { [key: string]: number };
}

const HeatMapDataProvider = () => {
  const [data, setData] = useState<
    HeatMapSerie<DefaultHeatMapDatum, Record<string, unknown>>[]
  >([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = localStorage.getItem("userId") as string;
      const { data: transactions, error } = await getTransactions({
        userId: user,
      });

      if (error) {
        console.error("Error al obtener transacciones:", error);
        return;
      }

      const heatmapData = (transactions as EnrichedTransaction[])?.reduce(
        (acc: HeatmapCategory[], transaction: EnrichedTransaction) => {
          if (
            !transaction.category.name ||
            !transaction.date ||
            isNaN(transaction.amount)
          ) {
            console.warn("Transacción inválida:", transaction);
            return acc;
          }

          const category = acc.find(
            (item) => item.id === transaction.category.name
          );
          const date = new Date(transaction.date).toISOString().split("T")[0];

          if (category) {
            if (category.data[date]) {
              category.data[date] += transaction.amount;
            } else {
              category.data[date] = transaction.amount;
            }
          } else {
            const newCategory = {
              id: transaction.category.name,
              data: { [date]: transaction.amount },
            };
            acc.push(newCategory);
          }

          return acc;
        },
        []
      );

      const formattedData = heatmapData.map((category) => ({
        id: category.id,
        data: Object.entries(category.data).map(([key, value]) => ({
          x: key,
          y: value,
        })),
      }));
      setData(
        formattedData as HeatMapSerie<
          DefaultHeatMapDatum,
          Record<string, unknown>
        >[]
      );
    };

    fetchTransactions();
  }, []);

  if (!data || data.length === 0) {
    return <p>No hay datos suficientes para mostrar el gráfico</p>;
  }

  return <HeatMap data={data} />;
};

export default HeatMapDataProvider;
