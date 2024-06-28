import AccountSummary from "../components/AccountSummary";
import TransactionOverviewList from "../components/Sections/TransactionOverviewList";

function OverviewPage() {
  return (
    <main className="col-span-12 lg:col-span-10 p-5 lg:p-10">
      <h1 className="text-2xl lg:text-3xl mb-6 font-outfit">
        Welcome, here is your account overview
      </h1>
      <div className="md:grid md:grid-cols-6 gap-6">
        <AccountSummary />
        <TransactionOverviewList />
      </div>
    </main>
  );
}

export default OverviewPage;
