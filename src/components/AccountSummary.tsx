import PieChart from "./PieChart";

const AccountSummary = () => {
  return (
    <section className="col-span-4 p-6">
      <h2 className="text-3xl mb-6">Account Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow p-5">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-lg font-semibold">$5,000.00</p>
        </div>
        <div className="shadow p-5">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-lg font-semibold">$5,000.00</p>
        </div>
        <div className="shadow p-5">
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-lg font-semibold">$5,000.00</p>
        </div>
        <div className="shadow p-5">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-lg font-semibold">10</p>
        </div>
      </div>

      <div style={{ height: "500px" }}>
        <PieChart />
      </div>
    </section>
  );
};

export default AccountSummary;
