import { useCategories } from "../context/CategoriesContext";
import { formatCurrency } from "../utils/formatCurrency";

export interface ITransactionOverview {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  icon?: React.ReactNode;
  category: string;
}

const TransactionItem: React.FC<ITransactionOverview> = (
  props: ITransactionOverview
) => {
  const { description, amount, type, category } = props;
  const { categories } = useCategories();
  const Icon = categories.map((categoryGroup) => {
    return categoryGroup.categories.map((cat) => {
      if (cat.name === category) {
        return cat.icon;
      }
    });
  });

  const classes = {
    listItem:
      "grid grid-cols-12 md:grid-cols-1 lg:grid-cols-12 pb-3 items-start justify-between [&:not(:last-child)]:border-b border-neutral-200 dark:border-neutral-700",
    iconWrapper:
      "flex items-center col-span-2 text-neutral-400 dark:text-neutral-600 mt-2",
    descriptionWrapper: "flex flex-col items-start col-span-7 gap-1",
    description: "line-clamp-1",
    type: "text-sm text-gray-600 dark:text-gray-400",
    amount:
      "font-medium col-span-3 text-lg text-neutral-800 dark:text-neutral-400 text-right",
  };

  return (
    <li className={classes.listItem} key={props.id}>
      {Icon && <div className={classes.iconWrapper}>{Icon}</div>}
      <div className={classes.descriptionWrapper}>
        <p className={classes.description}>{description}</p>
        <p className={classes.type}>{type}</p>
      </div>
      <p className={classes.amount}>{formatCurrency(amount)}</p>
    </li>
  );
};

export default TransactionItem;
