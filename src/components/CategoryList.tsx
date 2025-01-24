import { FaTimes } from "react-icons/fa";
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
          className="relative flex shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg"
        >
          {!defaultCategories.includes(category) && (
            <button
              onClick={() => handleRemoveCategory(category)}
              className="absolute top-0 right-0 m-0 -p2 bg-transparent"
            >
              <FaTimes color="#888" size="12" />
            </button>
          )}
          <div className="flex items-center">{categories[category].icon}</div>
          <div className="ml-4">
            <p>{category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
