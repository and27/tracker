import { useEffect, useState } from "react";
import HeatMap from "../Graphs/HeatMap";
import { getTransactions } from "../../utils/api/transactions";
import { EnrichedTransaction } from "./PieChartDataProvider";

interface HeatmapCategory {
  id: string;
  [key: string]: number | string;
}

const HeatMapDataProvider = () => {
  const [data, setData] = useState<HeatmapCategory[]>([]);

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

      console.log("Transacciones originales:", transactions);

      const heatmapData = (transactions as EnrichedTransaction[])?.reduce(
        (acc: HeatmapCategory[], transaction: EnrichedTransaction) => {
          console.log("Procesando transacción:", transaction);

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
            category[date] = (Number(category[date]) || 0) + transaction.amount;
            console.log("Actualizando categoría existente:", category);
          } else {
            const newCategory = {
              id: transaction.categoryName,
              [date]: transaction.amount,
            };
            acc.push(newCategory);
            console.log("Agregando nueva categoría:", newCategory);
          }

          return acc;
        },
        []
      );

      console.log("Datos procesados para HeatMap:", heatmapData);
      setData(heatmapData);
    };

    fetchTransactions();
  }, []);

  if (!data || data.length === 0) {
    console.log("Datos no disponibles o incorrectos:", data);
    return <p>No hay datos suficientes para mostrar el gráfico</p>;
  }

  return <HeatMap />;
};

export default HeatMapDataProvider;
