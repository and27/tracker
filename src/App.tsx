import "./App.css";
import { TransactionOverview } from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import transactionsData from "./data/transactions.json";

const transactions: TransactionOverview[] =
  transactionsData as TransactionOverview[];

function App() {
  return (
    <>
      <TransactionList transactions={transactions} />
    </>
  );
}

export default App;
