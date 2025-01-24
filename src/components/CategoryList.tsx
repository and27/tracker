import { useCategories } from "../context/CategoriesContext";
import { defaultCategories } from "../data/defaultCategories";

interface CategoryListProps {
  handleRemoveCategory: (category: string) => void;
}

const CategoryList = ({ handleRemoveCategory }: CategoryListProps) => {
  const { categories } = useCategories();
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 my-4 gap-5" role="list">
      {Object.keys(categories).map((category) => (
        <div
          key={category}
          role="listitem"
          className="bg-gray-200 p-2 flex justify-between items-center"
        >
          <span>{category}</span>
          {!defaultCategories.includes(category) && (
            <button
              onClick={() => handleRemoveCategory(category)}
              className="text-red-500"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
