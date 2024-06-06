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
    <div className="col-span-2 px-10 py-8 m-10 bg-white dark:bg-neutral-900 shadow">
      <h2 className="text-2xl lg:text-3xl mb-6">Last transactions</h2>
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
