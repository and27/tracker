import { FaTimes } from "react-icons/fa";
import { useCategories } from "../context/CategoriesContext";
import { defaultCategories } from "../data/defaultCategories";

interface CategoryListProps {
  handleRemoveCategory: (category: string) => void;
}

const CategoryList = ({ handleRemoveCategory }: CategoryListProps) => {
  const { categories } = useCategories();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-5" role="list">
      {Object.keys(categories).map((category) => (
        <div
          key={category}
          role="listitem"
          className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-white/90 hover:shadow-lg dark:hover:bg-neutral-800/90 dark:hover:shadow-none 
          xl:min-w-60 relative flex justify-between shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg"
        >
          {!defaultCategories.some(
            (defaultCategory) => defaultCategory.name === category
          ) && (
            <button
              title="Remove category"
              onClick={() => handleRemoveCategory(category)}
              className="absolute top-0 right-0 m-0 -p2 bg-transparent"
            >
              <span className="sr-only">Remove category</span>
              <FaTimes color="#888" size="12" />
            </button>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">{categories[category].icon}</div>
            <p>{category}</p>
          </div>
          <span className="text-neutral-600 dark:text-neutral-400">$500</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
