import AccountSummary from "../components/AccountSummary";
import { Footer } from "../components/Sections/Footer";
import TransactionOverviewList from "../components/Sections/TransactionOverviewList";

function OverviewPage() {
  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <main className="p-5 lg:p-10">
        <h1 className="text-2xl lg:text-3xl mb-6 font-outfit">
          Welcome, here is your account overview
        </h1>
        <div className="md:grid md:grid-cols-6 gap-6">
          <AccountSummary />
          <TransactionOverviewList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OverviewPage;
