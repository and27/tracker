export interface TransactionOverview {
  id: number;
  name: string;
  amount: number;
  type: "income" | "expense";
}

const Transaction: React.FC<TransactionOverview> = (
  props: TransactionOverview
) => {
  const { name, amount, type } = props;
  return (
    <div className="flex gap-2 items-start justify-between">
      <div className="flex flex-col items-start">
        <p>{name}</p>
        <p className="text-gray-400">{type}</p>
      </div>
      <p>{amount}</p>
    </div>
  );
};

export default Transaction;
