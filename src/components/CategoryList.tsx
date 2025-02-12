import { FaRocket } from "react-icons/fa6";
import { useCategories } from "../context/CategoriesContext";

interface CategoryListProps {
  handleRemoveCategory: (category: string) => void;
  handleEditCategory: (category: Category) => void;
}

const CategoryList = ({ handleEditCategory }: CategoryListProps) => {
  const { categories } = useCategories();

  return (
    <div className="flex flex-col" role="list">
      {categories.map((category) => (
        <div className="mt-5">
          <h3 className="font-semibold">{category.name.toUpperCase()}</h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 my-4 gap-5"
            role="list"
          >
            {category.categories.map((subCategory) => (
              <div
                key={subCategory.id}
                role="listitem"
                className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-white/90 hover:shadow-lg dark:hover:bg-neutral-800/90 dark:hover:shadow-none 
         xl:min-w-60 relative flex justify-between shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg"
                onClick={() =>
                  handleEditCategory({
                    id: subCategory.id,
                    name: subCategory.name,
                    group: subCategory.group,
                    isActive: subCategory.isActive,
                    budget: subCategory.budget,
                  })
                }
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    {subCategory.icon || <FaRocket />}
                  </div>
                  <p>{subCategory.name}</p>
                </div>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {subCategory.budget}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
