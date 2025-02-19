import { FaRocket } from "react-icons/fa6";

type CategoryItemProps = {
  category: Category;
  handleEditCategory: (category: Category) => void;
};
const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  handleEditCategory,
}) => {
  return (
    <div
      key={category.id}
      role="listitem"
      className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-white/90 hover:shadow-lg dark:hover:bg-neutral-800/90 dark:hover:shadow-none 
         xl:min-w-60 relative flex justify-between shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg"
      onClick={() =>
        handleEditCategory({
          id: category.id,
          name: category.name,
          group: category.group,
          isActive: category.isActive,
          budget: category.budget,
        })
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">{category.icon || <FaRocket />}</div>
        <p>{category.name}</p>
      </div>
      <span className="text-neutral-600 dark:text-neutral-400">
        {category.budget}
      </span>
      {category.isActive && (
        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-md"></span>
      )}
    </div>
  );
};

export default CategoryItem;
