import { TransactionOverview } from "./Transaction";
import Transaction from "./Transaction";

interface TransactionListProps {
  transactions: TransactionOverview[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="shadow-lg p-6 ">
      <h2 className="text-2xl mb-5">Last transactions</h2>
      <ul className="flex flex-col gap-3">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            type={transaction.type}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
