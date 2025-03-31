import { FaPen } from "react-icons/fa6";

interface BudgetCardProps {
  name: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  budget: number;
  spent?: number;
  onEdit: () => void;
}

const BudgetCard = ({
  name,
  icon,
  budget,
  isActive = false,
  spent = 0,
  onEdit,
}: BudgetCardProps) => {
  const hasBudget = budget > 0;
  const percentage = hasBudget ? Math.min((spent / budget) * 100, 100) : 0;
  const exceeded = hasBudget && spent > budget;

  return (
    <div
      className={`shadow-sm bg-neutral-200 dark:shadow-none rounded-lg p-5 dark:bg-zinc-800/40
      ${!isActive && "opacity-50"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-top gap-2">
            {icon}
            <h4 className="leading-none font-semibold text-neutral-700 dark:text-neutral-100">
              {name}
            </h4>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            {hasBudget ? `$${spent} / $${budget}` : `$${spent} / —`}
          </div>
        </div>
        <button
          onClick={onEdit}
          className="bg-transparent p-1 dark:text-indigo-500 hover:text-indigo-400 transition-all"
          title="Editar"
        >
          <FaPen className="w-4 h-4" />
        </button>
      </div>

      <div
        className="w-full bg-neutral-300 dark:bg-zinc-700 rounded-full h-1"
        title={hasBudget ? `${percentage.toFixed(0)}%` : "Sin presupuesto"}
      >
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
            hasBudget
              ? exceeded
                ? "bg-red-500"
                : "bg-green-500"
              : "bg-neutral-700 dark:bg-neutral-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCard;
