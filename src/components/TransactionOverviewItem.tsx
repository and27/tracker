import { useCategories } from "../context/CategoriesContext";
import { formatCurrency } from "../utils/formatCurrency";

export interface ITransactionOverview {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const TransactionOverviewItem: React.FC<ITransactionOverview> = (
  props: ITransactionOverview
) => {
  const { description, amount, type, category } = props;
  const { categories } = useCategories();
  const Icon = categories?.[category]?.icon || null;

  const classes = {
    listItem:
      "grid grid-cols-12 pb-3 items-center justify-between [&:not(:last-child)]:border-b border-neutral-200 dark:border-neutral-700",
    iconWrapper:
      "flex items-center col-span-2 text-neutral-400 dark:text-neutral-600",
    descriptionWrapper: "flex flex-col items-start col-span-6",
    description: "font-semibold",
    type: "text-sm text-neutral-800 dark:text-neutral-400",
    amount:
      "font-medium col-span-4 text-lg text-neutral-800 dark:text-neutral-400 text-right",
  };

  return (
    <li className={classes.listItem}>
      {Icon && <div className={classes.iconWrapper}>{Icon}</div>}
      <div className={classes.descriptionWrapper}>
        <p className={classes.description}>{description}</p>
        <p className={classes.type}>{type}</p>
      </div>
      <p className={classes.amount}>{formatCurrency(amount)}</p>
    </li>
  );
};

export default TransactionOverviewItem;
