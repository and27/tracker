import PieChart from "./Graphs/PieChart";

const dummyData = [
  { id: "1", label: "Groceries", value: 200 },
  { id: "2", label: "Transportation", value: 100 },
  { id: "3", label: "Entertainment", value: 50 },
  { id: "4", label: "Health", value: 150 },
];

export const HomePageChart = () => {
  return (
    <section className="mx-auto bg-indigo-950 py-[8rem] text-center">
      <h2 className="text-3xl font-bold pb-8">Track your expenses</h2>
      <p className="w-96 mx-auto pb-8 leading-relaxed text-indigo-100">
        Easily monitor your spending with our interactive tracker. Visualize
        your financial habits with clear, colorful charts and stay on top of
        your budget.
      </p>
      <div style={{ height: "500px" }}>
        <PieChart data={dummyData} />
      </div>
    </section>
  );
};
