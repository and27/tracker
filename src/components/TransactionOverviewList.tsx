import TransactionOverview, {
  ITransactionOverview,
} from "./TransactionOverview";

interface TransactionListProps {
  transactions: ITransactionOverview[];
}

const TransactionOverviewList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  return (
    <div className="col-span-2 p-6 ">
      <h2 className="text-3xl mb-6">Last transactions</h2>
      <ul className="flex flex-col gap-3">
        {transactions.map((transaction) => (
          <TransactionOverview
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

export default TransactionOverviewList;
