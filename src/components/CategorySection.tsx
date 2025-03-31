//OLD COMPONENT THAT WAS USED ON SETTINGS PAGE
import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import Button from "./Button";
import CategoryList from "./CategoryList";
import Subtitle from "./Subtitle";
import Modal from "./Modals/Modal";
import CategoryForm from "./Forms/CategoryForm";
// import { deleteCategoryByName } from "../utils/api/categories";
import { useCategories } from "../context/CategoriesContext";
import {
  addCategoryWithBudget,
  editCategoryWithBudget,
  getBudgets,
} from "../utils/supabaseDB";
import { useLanguageStore } from "../store/languageStore";

type BudgetData = { name: string; value: number };

const CategorySection = () => {
  const {
    categories,
    addCategory: addCategoryLocal,
    editCategory,
  } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"edit" | "add">("add");
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [budgetData, setBudgetData] = useState<BudgetData[]>([]);
  const title = formType === "add" ? "Add Category" : "Edit Category";
  const user = localStorage.getItem("userId") || "";
  const { t } = useLanguageStore();
  const uid = localStorage.getItem("userId") || "";

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEditForm = (category: Category) => {
    setFormType("edit");
    setCurrentCategory(category);
    toggleModal();
  };

  const handleAddForm = () => {
    setFormType("add");
    setCurrentCategory(undefined);
    toggleModal();
  };

  const addCat = async (category: Category) => {
    const { error } = await addCategoryWithBudget(category, uid);
    if (error) console.error("Failed to add category:", error);
    addCategoryLocal(category);
    toggleModal();
  };

  const editCat = async (category: Category) => {
    const { error } = await editCategoryWithBudget(category, uid);
    if (error) console.error("Failed to edit category:", error);
    editCategory(category);
    toggleModal();
  };

  // const handleRemoveCategory = async (category: string) => {
  //   try {
  //     removeCategory(category);
  //     const { error } = await deleteCategoryByName("user1", category);
  //     if (error) throw new Error(error);
  //   } catch (error) {
  //     console.error("Failed to remove category:", error);
  //   }
  // };

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

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <div>
          <Subtitle title={t("categories.title")} />
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            {t("categories.description")}
          </p>
        </div>
        <Button onClick={handleAddForm}>{t("categories.cta")}</Button>
      </div>
      <div className="flex lg:flex-row flex-col lg:gap-10">
        <CategoryList
          handleRemoveCategory={() => {}}
          handleEditCategory={handleEditForm}
        />
        <div className="w-full lg:w-1/2 h-96 lg:p-4">
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
      <Modal isOpen={isOpen} onClose={toggleModal} title={title}>
        <CategoryForm
          handleAction={formType === "add" ? addCat : editCat}
          type={formType}
          currentCategory={currentCategory}
        />
      </Modal>
    </section>
  );
};

export default CategorySection;
