import { useCategories } from "../context/CategoriesContext";
import { translateCategory } from "../utils/translationUtils";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  handleRemoveCategory: (category: string) => void;
  handleEditCategory: (category: Category) => void;
}

const CategoryList = ({ handleEditCategory }: CategoryListProps) => {
  const { categories } = useCategories();

  const orderMap: Record<string, number> = {
    survival: 1,
    optional: 2,
    culture: 3,
    extra: 4,
  };

  const sortedCategories = [...categories].sort((a, b) => {
    return (orderMap[a.id] || 99) - (orderMap[b.id] || 99);
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
            {category.categories.map((subCategory) => {
              const translatedCategoryName = translateCategory(
                subCategory.name
              );
              const translatedCategory = {
                ...subCategory,
                name: translatedCategoryName,
              };
              return (
                <CategoryItem
                  key={subCategory.id}
                  category={translatedCategory}
                  handleEditCategory={handleEditCategory}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
