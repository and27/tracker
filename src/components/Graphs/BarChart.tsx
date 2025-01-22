import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../utils/themeGraphColors";

type dataPoint = {
  label: string;
  value: number;
};
interface BarChartProps {
  data: dataPoint[];
}

const BarChart = ({ data }: BarChartProps) => {
  const { theme } = useTheme();
  const generateColorMap = (data: dataPoint[]) => {
    const categories = [...new Set(data.map((item) => item.label))];
    const colors = [
      "#7D9FDD",
      "#A5B8D8",
      "#C3D5E6",
      "#A7D7C5",
      "#F7D9C4",
      "#F2A97E",
      "#D3B5E5",
      "#E8C9A7",
      "#B4C6A6",
      "#C4A4B3",
    ];

    const colorMap: Record<string, string> = {};
    categories.forEach((category, index) => {
      colorMap[category] = colors[index % colors.length]; // Asignar colores cíclicamente
    });

    return colorMap;
  };
  const colorMap = generateColorMap(data); // Crear el mapa de colores dinámico
  if (!data.length) return <p>No information to display</p>;

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        colors={({ data }) => colorMap[data.label]}
        indexBy="label"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Amount ($)",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        theme={theme === "dark" ? darkTheme : lightTheme}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export default BarChart;
