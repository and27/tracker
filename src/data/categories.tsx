import {
  FaCar,
  FaShoppingCart,
  FaBolt,
  FaHeartbeat,
  FaFilm,
  FaBook,
  FaQuestion,
  FaHome,
} from "react-icons/fa";

type categoriesType = {
  [key: string]: {
    icon: React.ReactNode;
  };
};

export const categories: categoriesType = {
  food: { icon: <FaShoppingCart /> },
  groceries: { icon: <FaShoppingCart /> },
  rent: { icon: <FaHome /> },
  utilities: { icon: <FaBolt /> },
  transportation: { icon: <FaCar /> },
  health: { icon: <FaHeartbeat /> },
  entertainment: { icon: <FaFilm /> },
  education: { icon: <FaBook /> },
  other: { icon: <FaQuestion /> },
};
