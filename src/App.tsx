import "./App.css";
import SidebarMenu from "./components/SidebarMenu";
import { TransactionOverview } from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import transactionsData from "./data/transactions.json";

const transactions: TransactionOverview[] =
  transactionsData as TransactionOverview[];

function App() {
  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <main className="flex gap-3">
          <TransactionList transactions={transactions} />
        </main>
      </div>
    </>
  );
}

export default App;
