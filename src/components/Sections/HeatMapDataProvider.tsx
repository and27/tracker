import { useEffect, useState } from "react";
import HeatMap from "../Graphs/HeatMap";
import { getTransactions } from "../../utils/api/transactions";
import { EnrichedTransaction } from "./PieChartDataProvider";
import { DefaultHeatMapDatum, HeatMapSerie } from "@nivo/heatmap";

interface HeatmapCategory {
  id: string;
  data: { [key: string]: number };
}

const HeatMapDataProvider = () => {
  const [data, setData] = useState<HeatMapSerie<DefaultHeatMapDatum, {}>[]>([]);

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
            !transaction.categoryName ||
            !transaction.date ||
            isNaN(transaction.amount)
          ) {
            console.warn("Transacción inválida:", transaction);
            return acc;
          }

          const category = acc.find(
            (item) => item.id === transaction.categoryName
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
              id: transaction.categoryName,
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
      setData(formattedData as HeatMapSerie<DefaultHeatMapDatum, {}>[]);
    };

    fetchTransactions();
  }, []);

  if (!data || data.length === 0) {
    console.log("Datos no disponibles o incorrectos:", data);
    return <p>No hay datos suficientes para mostrar el gráfico</p>;
  }

  return <HeatMap data={data} />;
};

export default HeatMapDataProvider;
