import { useState } from "react";
import Button from "../Button";
import { createCategory } from "../../utils/api/categories";

interface NewCategoryProps {
  handleAddCategory: (categoryName: string) => void;
}

const NewCategory = ({ handleAddCategory }: NewCategoryProps) => {
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const uid = localStorage.getItem("userId") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      setError("Category is required");
      return;
    }
    const { error } = await createCategory({ name: category, userId: uid });

    if (error) {
      setError(error);
      return;
    } else {
      handleAddCategory(category);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="category"
        className="flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Category Name
        <input
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="category"
          name="category"
          onChange={handleChange}
        />
      </label>
      <Button>Add Category</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NewCategory;
