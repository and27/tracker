import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  FaCar,
  FaShoppingCart,
  FaHeartbeat,
  FaFilm,
  FaBook,
  FaQuestion,
  FaHome,
} from "react-icons/fa";
import { FaHeartCircleCheck, FaIceCream, FaTrain } from "react-icons/fa6";
import { getCategories } from "../utils/api/categories";

type IconType = ReactNode;

interface Category {
  icon: IconType;
}

interface CategoriesContextType {
  categories: { [key: string]: Category };
  setCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: Category }>
  >;
  addCategory: (key: string) => void;
  removeCategory: (key: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

interface CategoriesProviderProps {
  children: ReactNode;
}

const iconsMap: { [key: string]: IconType } = {
  food: <FaIceCream />,
  rent: <FaHome />,
  transport: <FaCar />,
  travel: <FaTrain />,
  shopping: <FaShoppingCart />,
  health: <FaHeartCircleCheck />,
  insurance: <FaHeartbeat />,
  entertainment: <FaFilm />,
  education: <FaBook />,
  other: <FaQuestion />,
};

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categories, setCategories] = useState<{ [key: string]: Category }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getCategories("user1");

      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        const fetchedCategories = data.reduce(
          (acc: { [key: string]: Category }, category: { name: string }) => {
            acc[category.name] = {
              icon: iconsMap[category.name.toLowerCase()] || <FaQuestion />,
            };
            return acc;
          },
          {}
        );
        setCategories(fetchedCategories);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = (key: string) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [key]: { icon: <FaQuestion /> },
    }));
  };

  const removeCategory = (key: string) => {
    setCategories((prevCategories) => {
      const { [key]: _, ...rest } = prevCategories;
      return rest;
    });
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, setCategories, addCategory, removeCategory }}
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
