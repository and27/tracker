import { useEffect, useMemo, useState } from "react";
import BudgetList from "../components/Budget/BudgetList";
import BudgetModal from "../components/Budget/BudgetModal";
import Subtitle from "../components/Subtitle";
import { useCategories } from "../context/CategoriesContext";
import { useLanguageStore } from "../store/languageStore";
import { useTransactionStore } from "../store/transactionStore";
import { ResponsivePie } from "@nivo/pie";
import {
  addCategoryWithBudget,
  editCategoryWithBudget,
  getBudgets,
} from "../utils/supabaseDB";
import { translateCategory } from "../utils/translationUtils";

type BudgetData = { name: string; value: number };

type ExtendedCategory = Category & {
  spent?: number;
  group?: "survival" | "optional" | "culture" | "extra";
};

const BudgetPage = () => {
  const { transactions } = useTransactionStore();
  const { lang, t } = useLanguageStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("edit");
  const [budgetData, setBudgetData] = useState<BudgetData[]>([]);
  const user = localStorage.getItem("userId") || "";
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const {
    categories,
    addCategory: addCategoryLocal,
    editCategory,
  } = useCategories();

  const addCat = async (category: Category) => {
    const { error } = await addCategoryWithBudget(category, user);
    if (error) console.error("Failed to add category:", error);
    addCategoryLocal(category);
    setModalOpen(false);
  };

  const editCat = async (category: Category) => {
    const preparedCategory = {
      ...category,
      budget: Number(category.budget),
    };
    const { error } = await editCategoryWithBudget(preparedCategory, user);
    if (error) console.error("Failed to edit category:", error);
    editCategory(category);
    setModalOpen(false);
  };

  const preparedCategories: ExtendedCategory[] = useMemo(() => {
    return categories.flatMap((group) =>
      group.categories.map((cat) => {
        const spent = transactions
          .filter((tx) => tx.category.id.toString() === cat.id)
          .reduce((acc, tx) => acc + tx.amount, 0);

        return {
          ...cat,
          name: translateCategory(cat.name),
          spent,
          group: group.id as "survival" | "optional" | "culture" | "extra",
        };
      })
    );
  }, [categories, transactions, lang]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const { data, error } = await getBudgets(user);
      if (error) console.error("Failed to fetch budgets:", error);
      const preparedData = data?.map((entry) => ({
        name: entry.category.name as string,
        value: entry.amount as number,
      }));

      if (preparedData) setBudgetData(preparedData);
    };

    fetchBudgets();
  }, [user, categories]);

  const totalBudget = preparedCategories.reduce(
    (acc, c) => acc + (c.budget || 0),
    0
  );
  const totalSpent = preparedCategories.reduce(
    (acc, c) => acc + (c.spent || 0),
    0
  );

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setModalType("edit");
    setModalOpen(true);
  };

  return (
    <section className="col-span-12 lg:col-span-10 px-4 md:px-8 pt-10 mb-10">
      <div className="mb-8">
        <Subtitle title={t("budget.title")} />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t("budget.period")}: Marzo 2025
        </p>
        <div className="mt-2 text-md font-medium">
          <span className="text-green-500">${totalSpent}</span> / ${totalBudget}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <BudgetList categories={preparedCategories} onEdit={handleEdit} />
        <div className="w-full md:w-1/2 h-96 lg:p-4">
          <ResponsivePie
            data={budgetData.map((entry) => ({
              id: entry.name,
              label: entry.name,
              value: entry.value,
            }))}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "set2" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsTextColor="#fff"
            arcLinkLabelsSkipAngle={10}
            arcLabelsSkipAngle={10}
            tooltip={({ datum }) => (
              <div
                style={{
                  padding: "12px",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "5px",
                }}
              >
                <p>{datum.label}</p>
              </div>
            )}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateY: 40,
                itemWidth: 100,
                itemHeight: 14,
                symbolSize: 14,
                symbolShape: "circle",
                itemTextColor: "#fff",
              },
            ]}
          />
        </div>
      </div>

      <BudgetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={modalType === "add" ? addCat : editCat}
        currentCategory={currentCategory}
        type={modalType}
      />
    </section>
  );
};

export default BudgetPage;
