import { useState } from "react";
import Button from "../Button";
import { addCategory } from "../../utils/supabaseDB";

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

    const { error } = await addCategory({ name: category, userId: uid });

    if (error) {
      console.error(error);
      return;
    } else {
      handleAddCategory(category);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="new category form">
      <label
        htmlFor="categoryName"
        className="mb-5 flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Category Name
        <input
          id="categoryName"
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="text"
          onChange={handleChange}
        />
      </label>
      <Button>Add Category</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NewCategory;
