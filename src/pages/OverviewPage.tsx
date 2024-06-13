import AccountSummary from "../components/AccountSummary";
import SidebarMenu from "../components/SidebarMenu";
import { ITransactionOverview } from "../components/TransactionOverview";
import TransactionOverviewList from "../components/TransactionOverviewList";
import transactionsData from "../data/transactions.json";

const transactions: ITransactionOverview[] =
  transactionsData as ITransactionOverview[];

function OverviewPage() {
  return (
    <>
      <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900">
        <SidebarMenu />
        <main className="col-span-10 md:grid md:grid-cols-6">
          <AccountSummary />
          <TransactionOverviewList transactions={transactions} />
        </main>
      </div>
    </>
  );
}

export default OverviewPage;
