import PieChart from "./PieChart";

export const HomePageChart = () => {
  return (
    <section className="mx-auto dark:bg-indigo-950 py-[8rem] text-center">
      <h2 className="text-3xl font-bold pb-8">Track your expenses</h2>
      <p className="w-96 mx-auto pb-8 ">
        Easily monitor your spending with our interactive tracker. Visualize
        your financial habits with clear, colorful charts and stay on top of
        your budget.
      </p>
      <div style={{ height: "500px" }}>
        <PieChart />
      </div>
    </section>
  );
};
