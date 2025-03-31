import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { useLanguageStore } from "../../store/languageStore";
import BudgetCard from "./BudgetCard";

interface ExtendedCategory extends Category {
  spent?: number;
  group?: "survival" | "optional" | "culture" | "extra";
}

interface BudgetListProps {
  categories: ExtendedCategory[];
  onEdit: (category: ExtendedCategory) => void;
}

const BudgetList = ({ categories, onEdit }: BudgetListProps) => {
  const { t } = useLanguageStore();
  const groups = ["survival", "optional", "culture", "extra"] as const;
  const groupTitles = {
    survival: t("budget.survival"),
    optional: t("budget.optional"),
    culture: t("budget.culture"),
    extra: t("budget.extra"),
  };

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="flex flex-col gap-10 w-full md:w-1/2 mb-10">
      {groups.map((group) => {
        const groupCategories = categories.filter((c) => c.group === group);
        if (groupCategories.length === 0) return null;

        const isCollapsed = collapsedGroups[group];

        return (
          <div key={group}>
            <button
              className="mb-5 md:w-96 px-3 py-2 border-neutral-500 border-2 rounded-lg flex items-center gap-2 text-left  text-lg font-semibold 
              bg-transparent text-neutral-700 dark:text-neutral-200 mb-2 hover:opacity-80 transition-all"
              onClick={() => toggleGroup(group)}
            >
              {isCollapsed ? (
                <FaChevronRight className="h-3 w-3 transition-transform duration-200" />
              ) : (
                <FaChevronDown className="h-3 w-3 transition-transform duration-200" />
              )}
              {groupTitles[group]}
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
              }`}
            >
              <div className="grid sm:grid-cols-2 gap-2 md:gap-5">
                {groupCategories
                  .sort((a, b) => {
                    return (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0);
                  })
                  .map((category) => (
                    <BudgetCard
                      key={category.id}
                      {...category}
                      onEdit={() => onEdit(category)}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetList;
