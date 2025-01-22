import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";

export type PieChartDataType = {
  id: string;
  label: string;
  value: number;
};

type PieChartProps = {
  data: PieChartDataType[];
};

const PieChart = ({ data }: PieChartProps) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log(data);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data.length) return <p>No Info</p>;

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      animate={true}
      arcLinkLabelsThickness={3}
      arcLinkLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "text",
          type: "patternDots",
          background: "inherit",
          color: "red",
        },
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c++",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: isMobile ? "top-left" : "bottom",
          direction: isMobile ? "column" : "row",
          justify: false,
          translateX: 0,
          translateY: isMobile ? 0 : 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#ccc",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
