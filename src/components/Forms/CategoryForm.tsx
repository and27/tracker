import { useState } from "react";
import Button from "../Button";
import Toggle from "../Toggle";

interface CategoryFormProps {
  type: "add" | "edit";
  currentCategory?: Category;
  handleAction: ({}: any) => void;
}

const CategoryForm = ({
  type,
  currentCategory,
  handleAction,
}: CategoryFormProps) => {
  const [category, setCategory] = useState<Category>(
    currentCategory ||
      ({
        isActive: type === "add" ? true : false,
      } as any)
  );
  const [error, setError] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory(
      (prev) =>
        ({
          ...prev,
          [e.target.id]: e.target.value,
        } as any)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      setError("Category is required");
      return;
    }
    handleAction(category);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="new category form">
      <label
        htmlFor="name"
        className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Category Name
        <input
          id="name"
          className="bg-transparent border border-neutral-700 py-2 px-4 rounded-md mt-1"
          type="text"
          value={currentCategory?.name}
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="group"
        className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Category Group
        <select
          id="group"
          onChange={handleChange}
          value={currentCategory?.group}
          className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
        >
          <option>Select a group</option>
          <option value="survival">Survival</option>
          <option value="optional">Optional</option>
          <option value="culture">Culture</option>
          <option value="extra">Extra</option>
        </select>
      </label>

      <label
        htmlFor="budget"
        className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Max Budget
        <input
          id="budget"
          className="bg-transparent border border-neutral-700 py-2 px-4 rounded-md mt-1"
          type="number"
          value={currentCategory?.budget}
          onChange={handleChange}
        />
      </label>
      <div className="flex justify-between items-center pb-5">
        <label className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg">
          Active
        </label>
        <Toggle
          name={type === "add" ? "add" : currentCategory?.name || ""}
          handler={() => {
            setCategory((prev) => ({ ...prev, isActive: !prev.isActive }));
          }}
          isActiveByDefault={type === "add" ? true : currentCategory?.isActive}
        />
      </div>
      <Button>{type === "edit" ? "Edit Category" : "Add Category"}</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CategoryForm;
