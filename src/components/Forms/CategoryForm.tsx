import { useState } from "react";
import Button from "../Button";
import Toggle, { options } from "../Toggle";

interface CategoryFormProps {
  type: "add" | "edit";
  currentCategory?: Category;
  handleAction: (category: Category) => void;
}

const CategoryForm = ({
  type,
  currentCategory,
  handleAction,
}: CategoryFormProps) => {
  const [category, setCategory] = useState<Category>(
    currentCategory || {
      id: "",
      name: "",
      group: "",
      budget: 0,
      isActive: true,
    }
  );

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [id]: id === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category.name || !category.group || category.budget === undefined) {
      setError("All fields are required");
      return;
    }
    handleAction(category);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="category form">
      <label
        htmlFor="name"
        className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Category Name
        <input
          id="name"
          className={`${
            type === "edit"
              ? "bg-neutral-900/50 text-neutral-400"
              : "bg-transparent"
          } border border-neutral-700 py-2 px-4 rounded-md mt-1`}
          type="text"
          value={category.name}
          onChange={handleChange}
          disabled={type === "edit"}
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
          value={category.group}
          className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
        >
          <option value="">Select a group</option>
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
          value={category.budget}
          onChange={handleChange}
        />
      </label>

      <div className="flex items-center justify-between mb-5">
        <span className="text-gray-700 dark:text-neutral-200 font-semibold text-lg">
          {category.isActive ? "Active" : "Inactive"}
        </span>
        <Toggle
          name={type === "add" ? "other" : (currentCategory?.name as options)}
          handler={() =>
            setCategory((prev) => ({ ...prev, isActive: !prev.isActive }))
          }
          isActiveByDefault={
            type === "add" ? true : !!currentCategory?.isActive
          }
        />
      </div>

      <Button type="submit">
        {type === "edit" ? "Edit Category" : "Add Category"}
      </Button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default CategoryForm;
