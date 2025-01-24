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
    <section className="mt-10">
      <div className="flex justify-between items-center">
        <div>
          <Subtitle title="Categories" />
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Manage your categories here.
          </p>
        </div>
        <CategoryList handleRemoveCategory={handleRemoveCategory} />
        <Button onClick={handleModal}>Add Category</Button>
      </div>
    </section>
  );
};

export default CategorySection;
