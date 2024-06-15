export interface ITransactionOverview {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

const TransactionOverview: React.FC<ITransactionOverview> = (
  props: ITransactionOverview
) => {
  const { description, amount, type } = props;
  return (
    <li className="flex pb-4 items-center justify-between border-b border-neutral-200">
      <div className="flex flex-col items-start">
        <p className="font-semibold">{description}</p>
        <p className="text-gray-400">{type}</p>
      </div>
      <p className="font-medium">{amount}</p>
    </li>
  );
};

export default TransactionOverview;
