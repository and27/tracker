import { ResponsiveHeatMap } from "@nivo/heatmap";

const data = [
  {
    id: "Japan",
    data: [
      {
        x: "Train",
        y: 60563,
      },
      {
        x: "Subway",
        y: -25529,
      },
      {
        x: "Bus",
        y: 86619,
      },
      {
        x: "Car",
        y: -58261,
      },
      {
        x: "Boat",
        y: 63633,
      },
      {
        x: "Moto",
        y: 5423,
      },
      {
        x: "Moped",
        y: -78492,
      },
      {
        x: "Bicycle",
        y: -9193,
      },
      {
        x: "Others",
        y: 2063,
      },
    ],
  },
  {
    id: "France",
    data: [
      {
        x: "Train",
        y: 98877,
      },
      {
        x: "Subway",
        y: -89484,
      },
      {
        x: "Bus",
        y: 58357,
      },
      {
        x: "Car",
        y: -99543,
      },
      {
        x: "Boat",
        y: 61510,
      },
      {
        x: "Moto",
        y: -49418,
      },
      {
        x: "Moped",
        y: 54074,
      },
      {
        x: "Bicycle",
        y: -68547,
      },
      {
        x: "Others",
        y: -32991,
      },
    ],
  },
  {
    id: "US",
    data: [
      {
        x: "Train",
        y: -6781,
      },
      {
        x: "Subway",
        y: -66342,
      },
      {
        x: "Bus",
        y: 88770,
      },
      {
        x: "Car",
        y: 36708,
      },
      {
        x: "Boat",
        y: 57378,
      },
      {
        x: "Moto",
        y: 74928,
      },
      {
        x: "Moped",
        y: -92689,
      },
      {
        x: "Bicycle",
        y: -28860,
      },
      {
        x: "Others",
        y: 84052,
      },
    ],
  },
  {
    id: "Germany",
    data: [
      {
        x: "Train",
        y: 42234,
      },
      {
        x: "Subway",
        y: -91009,
      },
      {
        x: "Bus",
        y: 21431,
      },
      {
        x: "Car",
        y: 64056,
      },
      {
        x: "Boat",
        y: 43857,
      },
      {
        x: "Moto",
        y: 36982,
      },
      {
        x: "Moped",
        y: -7498,
      },
      {
        x: "Bicycle",
        y: 27750,
      },
      {
        x: "Others",
        y: 59713,
      },
    ],
  },
  {
    id: "Norway",
    data: [
      {
        x: "Train",
        y: 86816,
      },
      {
        x: "Subway",
        y: 25369,
      },
      {
        x: "Bus",
        y: -99458,
      },
      {
        x: "Car",
        y: -35329,
      },
      {
        x: "Boat",
        y: -51164,
      },
      {
        x: "Moto",
        y: 29781,
      },
      {
        x: "Moped",
        y: 19522,
      },
      {
        x: "Bicycle",
        y: -20788,
      },
      {
        x: "Others",
        y: -34004,
      },
    ],
  },
  {
    id: "Iceland",
    data: [
      {
        x: "Train",
        y: 11247,
      },
      {
        x: "Subway",
        y: 288,
      },
      {
        x: "Bus",
        y: 18991,
      },
      {
        x: "Car",
        y: -98638,
      },
      {
        x: "Boat",
        y: 67633,
      },
      {
        x: "Moto",
        y: -93161,
      },
      {
        x: "Moped",
        y: 44609,
      },
      {
        x: "Bicycle",
        y: -18626,
      },
      {
        x: "Others",
        y: 44237,
      },
    ],
  },
  {
    id: "UK",
    data: [
      {
        x: "Train",
        y: -67349,
      },
      {
        x: "Subway",
        y: -12537,
      },
      {
        x: "Bus",
        y: 57942,
      },
      {
        x: "Car",
        y: -25850,
      },
      {
        x: "Boat",
        y: -70357,
      },
      {
        x: "Moto",
        y: -46788,
      },
      {
        x: "Moped",
        y: 85679,
      },
      {
        x: "Bicycle",
        y: -422,
      },
      {
        x: "Others",
        y: -96103,
      },
    ],
  },
  {
    id: "Vietnam",
    data: [
      {
        x: "Train",
        y: -98165,
      },
      {
        x: "Subway",
        y: -69984,
      },
      {
        x: "Bus",
        y: 74231,
      },
      {
        x: "Car",
        y: -48751,
      },
      {
        x: "Boat",
        y: 56562,
      },
      {
        x: "Moto",
        y: -60520,
      },
      {
        x: "Moped",
        y: 66700,
      },
      {
        x: "Bicycle",
        y: 31265,
      },
      {
        x: "Others",
        y: -82160,
      },
    ],
  },
];

const MyResponsiveHeatMap = () => (
  <ResponsiveHeatMap
    data={data}
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
      legend: "country",
      legendPosition: "middle",
      legendOffset: 70,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: -72,
      truncateTickAt: 0,
    }}
    colors={{
      type: "diverging",
      scheme: "red_yellow_blue",
      divergeAt: 0.5,
      minValue: -100000,
      maxValue: 100000,
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
export default MyResponsiveHeatMap;
