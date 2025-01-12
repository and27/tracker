import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../utils/themeGraphColors";

interface LineChartProps {
  data: any;
}

const LineChart = ({ data }: LineChartProps) => {
  const { theme } = useTheme();
  return (
    <ResponsiveLine
      data={data}
      colors={{ scheme: "nivo" }}
      enableSlices="x"
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xFormat="time:%Y-%m-%d"
      xScale={{
        format: "%Y-%m-%d",
        precision: "day",
        type: "time",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
        format: "%b %d", // Ejemplo: "Jan 01"
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount ($)",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      theme={theme === "dark" ? darkTheme : lightTheme}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
