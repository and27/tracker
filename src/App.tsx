import "./App.css";
import AccountSummary from "./components/AccountSummary";
import SidebarMenu from "./components/SidebarMenu";
import { TransactionOverview } from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import transactionsData from "./data/transactions.json";

const transactions: TransactionOverview[] =
  transactionsData as TransactionOverview[];

function App() {
  return (
    <>
      <div className="grid grid-cols-12">
        <SidebarMenu />
        <main className="col-span-10 grid grid-cols-6">
          <AccountSummary />
          <TransactionList transactions={transactions} />
        </main>
      </div>
    </>
  );
}

export default App;
