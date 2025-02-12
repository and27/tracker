import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { FaQuestion } from "react-icons/fa";
import { getCategoriesWithBudget } from "../utils/supabaseDB";
import { iconsMap } from "../data/iconsMap";

interface CategoriesContextType {
  categories: CategoryGroup[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryGroup[]>>;
  addCategory: (cat: Category) => void;
  // removeCategory: (cat: ExtendedCategory) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const user = (await localStorage.getItem("userId")) as string;
      const consolidated = await getCategoriesWithBudget(user);
      const categoriesWithIcons = consolidated?.map((category) => ({
        ...category,
        categories: category.categories.map((subcategory: Category) => ({
          ...subcategory,
          icon: iconsMap[subcategory.name.toLowerCase()] || <FaQuestion />,
        })),
      }));
      if (categoriesWithIcons) setCategories(categoriesWithIcons);
    };

    fetchCategories();
  }, []);

  const addCategory = (category: Category) => {
    setCategories((prevCategories) => {
      const currentGroup = prevCategories.find(
        (cat) => cat.id === category.group
      );

      if (!currentGroup) {
        return prevCategories;
      }

      const updatedGroup: CategoryGroup = {
        ...currentGroup,
        categories: [
          ...currentGroup.categories,
          {
            ...category,
          },
        ],
      };

      return [
        ...prevCategories.filter((cat) => cat.id !== category.group),
        updatedGroup,
      ];
    });
  };

  // const removeCategory = (name: string) => {
  //   setCategories((prevCategories) =>
  //     prevCategories.filter((category) => category.name !== name)
  //   );
  // };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        addCategory,
        //  removeCategory
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
