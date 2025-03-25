import { ResponsiveLine } from "@nivo/line";

type AreaChartProps = {
  data: {
    id: string; // categoría (ej: "Comida")
    data: { x: string; y: number }[]; // fechas + valores
  }[];
};

const AreaChart = ({ data }: AreaChartProps) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          stacked: true,
          min: "auto",
          max: "auto",
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Fecha",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Gasto ($)",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableArea={true}
        areaOpacity={0.3}
        colors={{ scheme: "category10" }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
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
        tooltip={({ point }) => (
          <div
            style={{
              background: "black",
              color: "white",
              padding: "6px 9px",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            <strong>{point.serieId}</strong>: ${point.data.yFormatted}
            <br />
            <small>{point.data.xFormatted}</small>
          </div>
        )}
      />
    </div>
  );
};

export default AreaChart;
