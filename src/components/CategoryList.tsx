import { FaRocket } from "react-icons/fa6";
import { useCategories } from "../context/CategoriesContext";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  handleRemoveCategory: (category: string) => void;
  handleEditCategory: (category: Category) => void;
}

const CategoryList = ({ handleEditCategory }: CategoryListProps) => {
  const { categories } = useCategories();

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.id === "survival") return -1;
    if (b.id === "survival") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col" role="list">
      {sortedCategories.map((category) => (
        <div className="mt-5" key={category.id}>
          <h3 className="font-semibold">{category.name.toUpperCase()}</h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 my-4 gap-5"
            role="list"
          >
            {category.categories.map((subCategory) => (
              <CategoryItem
                key={subCategory.id}
                category={subCategory}
                handleEditCategory={handleEditCategory}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
