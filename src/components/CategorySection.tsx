import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import Button from "./Button";
import CategoryList from "./CategoryList";
import Subtitle from "./Subtitle";
import { BudgetInsight } from "../data/mocks/insightsMock";
import Modal from "./Modal";
import CategoryForm from "./Forms/CategoryForm";
// import { deleteCategoryByName } from "../utils/api/categories";
import { useCategories } from "../context/CategoriesContext";
import {
  addCategoryWithBudget,
  editCategoryWithBudget,
} from "../utils/supabaseDB";

interface CategorySectionProps {
  budgetData: BudgetInsight[];
}

const CategorySection = ({ budgetData }: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"edit" | "add">("add");
  const { addCategory: addCategoryLocal } = useCategories();
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const title = formType === "add" ? "Add Category" : "Edit Category";

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
    addCategoryLocal(category);
    const uid = localStorage.getItem("userId") || "";
    const { error } = await addCategoryWithBudget(category, uid);
    if (error) console.error("Failed to add category:", error);
    toggleModal();
  };

  const editCat = async (category: Category) => {
    addCategoryLocal(category);
    const uid = localStorage.getItem("userId") || "";
    const { error } = await editCategoryWithBudget(category, uid);
    if (error) console.error("Failed to edit category:", error);
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

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center">
        <div>
          <Subtitle title="Categories & Budget" />
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Manage your categories and budget for each category here.
          </p>
        </div>
        <Button onClick={handleAddForm}>Add Category</Button>
      </div>
      <div className="flex">
        <CategoryList
          handleRemoveCategory={() => {}}
          handleEditCategory={handleEditForm}
        />
        <div className="w-full md:w-1/2 h-96">
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
