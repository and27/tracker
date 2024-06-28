import LineChart from "../components/LineChart";
import PieChartDataProvider from "../components/PieChartDataProvider";

const data = [
  {
    id: "japan",
    color: "hsl(11, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 268,
      },
      {
        x: "helicopter",
        y: 299,
      },
      {
        x: "boat",
        y: 212,
      },
      {
        x: "train",
        y: 1,
      },
      {
        x: "subway",
        y: 67,
      },
      {
        x: "bus",
        y: 230,
      },
      {
        x: "car",
        y: 159,
      },
      {
        x: "moto",
        y: 244,
      },
      {
        x: "bicycle",
        y: 239,
      },
      {
        x: "horse",
        y: 29,
      },
      {
        x: "skateboard",
        y: 228,
      },
      {
        x: "others",
        y: 242,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(112, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 56,
      },
      {
        x: "helicopter",
        y: 289,
      },
      {
        x: "boat",
        y: 239,
      },
      {
        x: "train",
        y: 233,
      },
      {
        x: "subway",
        y: 214,
      },
      {
        x: "bus",
        y: 113,
      },
      {
        x: "car",
        y: 145,
      },
      {
        x: "moto",
        y: 219,
      },
      {
        x: "bicycle",
        y: 92,
      },
      {
        x: "horse",
        y: 28,
      },
      {
        x: "skateboard",
        y: 263,
      },
      {
        x: "others",
        y: 139,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(207, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 270,
      },
      {
        x: "helicopter",
        y: 166,
      },
      {
        x: "boat",
        y: 243,
      },
      {
        x: "train",
        y: 28,
      },
      {
        x: "subway",
        y: 254,
      },
      {
        x: "bus",
        y: 107,
      },
      {
        x: "car",
        y: 123,
      },
      {
        x: "moto",
        y: 268,
      },
      {
        x: "bicycle",
        y: 143,
      },
      {
        x: "horse",
        y: 40,
      },
      {
        x: "skateboard",
        y: 63,
      },
      {
        x: "others",
        y: 54,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(1, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 16,
      },
      {
        x: "helicopter",
        y: 93,
      },
      {
        x: "boat",
        y: 33,
      },
      {
        x: "train",
        y: 54,
      },
      {
        x: "subway",
        y: 196,
      },
      {
        x: "bus",
        y: 23,
      },
      {
        x: "car",
        y: 90,
      },
      {
        x: "moto",
        y: 181,
      },
      {
        x: "bicycle",
        y: 54,
      },
      {
        x: "horse",
        y: 271,
      },
      {
        x: "skateboard",
        y: 166,
      },
      {
        x: "others",
        y: 24,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(232, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 169,
      },
      {
        x: "helicopter",
        y: 1,
      },
      {
        x: "boat",
        y: 147,
      },
      {
        x: "train",
        y: 21,
      },
      {
        x: "subway",
        y: 125,
      },
      {
        x: "bus",
        y: 120,
      },
      {
        x: "car",
        y: 114,
      },
      {
        x: "moto",
        y: 103,
      },
      {
        x: "bicycle",
        y: 30,
      },
      {
        x: "horse",
        y: 208,
      },
      {
        x: "skateboard",
        y: 192,
      },
      {
        x: "others",
        y: 183,
      },
    ],
  },
];
const ReportsPage = () => {
  return (
    <main className="col-span-12 lg:col-span-10 p-6">
      <div
        style={{ height: "500px" }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <PieChartDataProvider />
      </div>
      <div style={{ height: "500px" }}>
        <LineChart data={data} />
      </div>
    </main>
  );
};

export default ReportsPage;
