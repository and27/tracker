import {
  FaCar,
  FaShoppingCart,
  FaUtensils,
  FaBolt,
  FaShieldAlt,
  FaHeartbeat,
  FaFilm,
  FaBook,
  FaQuestion,
} from "react-icons/fa";

export interface ITransactionOverview {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const TransactionOverview: React.FC<ITransactionOverview> = (
  props: ITransactionOverview
) => {
  const { description, amount, type, category } = props;
  const Icon = getCategoryIcon(category);

  function getCategoryIcon(category: string) {
    switch (category) {
      case "other":
        return <FaQuestion />;
      case "transport":
        return <FaCar />;
      case "shopping":
        return <FaShoppingCart />;
      case "food":
        return <FaUtensils />;
      case "utilities":
        return <FaBolt />;
      case "insurance":
        return <FaShieldAlt />;
      case "health":
        return <FaHeartbeat />;
      case "entertainment":
        return <FaFilm />;
      case "education":
        return <FaBook />;
      default:
        return <FaQuestion />;
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  return (
    <li
      className="grid grid-cols-12 pb-3 items-center justify-between 
    [&:not(:last-child)]:border-b border-neutral-200 dark:border-neutral-700"
    >
      {Icon && (
        <div className="flex items-center col-span-2 text-neutral-400 dark:text-neutral-600">
          {Icon}
        </div>
      )}
      <div className="flex flex-col items-start col-span-6">
        <p className="font-semibold">{description}</p>
        <p className="text-neutral-500 text-sm">{type}</p>
      </div>
      <p className="font-medium col-span-4 text-lg text-neutral-500">
        {formatCurrency(amount)}
      </p>
    </li>
  );
};

export default TransactionOverview;
