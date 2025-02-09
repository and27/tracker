import { ResponsivePie } from "@nivo/pie";

interface BudgetEntry {
  id: number;
  name: string;
  value: number;
}

interface Props {
  data: BudgetEntry[];
}

const BudgetOptimization: React.FC<Props> = ({ data }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-white">
        🎯 Optimización del Presupuesto
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 h-64">
          <ResponsivePie
            data={data.map((entry) => ({
              id: entry.name,
              label: entry.name,
              value: entry.value,
            }))}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "set2" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsTextColor="#fff"
            arcLinkLabelsSkipAngle={10}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateY: 40,
                itemWidth: 100,
                itemHeight: 14,
                symbolSize: 14,
                symbolShape: "circle",
                itemTextColor: "#fff",
              },
            ]}
          />
        </div>

        <ul className="w-full md:w-1/2 space-y-2">
          {data.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center text-md p-2 rounded bg-neutral-800 text-white"
            >
              <span>{entry.name}</span>
              <span className="font-bold">${entry.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BudgetOptimization;
