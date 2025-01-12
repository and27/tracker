import {
  DefaultHeatMapDatum,
  HeatMapSerie,
  ResponsiveHeatMap,
} from "@nivo/heatmap";
import { darkTheme, lightTheme } from "../../utils/themeGraphColors";
import { useTheme } from "../../context/ThemeContext";

const MyResponsiveHeatMap = ({
  data,
}: {
  data: HeatMapSerie<DefaultHeatMapDatum, {}>[];
}) => {
  const { theme } = useTheme();

  return (
    <ResponsiveHeatMap
      data={data}
      ariaLabel="Heatmap for transactions by category and date"
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      valueFormat=">-.2s"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: "",
        legendOffset: 46,
        truncateTickAt: 0,
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Category",
        legendPosition: "middle",
        legendOffset: 70,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Category",
        legendPosition: "middle",
        legendOffset: -72,
        truncateTickAt: 0,
      }}
      theme={theme === "dark" ? darkTheme : lightTheme}
      colors={{
        type: "sequential",
        scheme: "blues",
        minValue: 0,
        maxValue: 100,
      }}
      emptyColor="#555555"
      legends={[
        {
          anchor: "bottom",
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: "row",
          tickPosition: "after",
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: ">-.2s",
          title: "Value →",
          titleAlign: "start",
          titleOffset: 4,
        },
      ]}
    />
  );
};
export default MyResponsiveHeatMap;
