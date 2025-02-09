import Button from "./Button";
import CategoryList from "./CategoryList";
import Subtitle from "./Subtitle";

interface CategorySectionProps {
  handleModal: () => void;
  handleRemoveCategory: (category: string) => void;
}

const CategorySection = ({
  handleModal,
  handleRemoveCategory,
}: CategorySectionProps) => {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div>
          <Subtitle title="Categories" />
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Manage your categories here.
          </p>
        </div>
        <Button onClick={handleModal}>Add Category</Button>
      </div>
      <CategoryList handleRemoveCategory={handleRemoveCategory} />
    </section>
  );
};

export default CategorySection;
