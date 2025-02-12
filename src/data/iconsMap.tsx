import { ReactNode } from "react";
import {
  FaCar,
  FaShoppingCart,
  FaHeartbeat,
  FaFilm,
  FaBook,
  FaHome,
  FaIceCream,
  FaTrain,
} from "react-icons/fa";
import { FaComputer, FaHeartCircleCheck, FaRocket } from "react-icons/fa6";

export const iconsMap: { [key: string]: ReactNode } = {
  food: <FaIceCream />,
  housing: <FaHome />,
  transport: <FaCar />,
  travel: <FaTrain />,
  clothing: <FaShoppingCart />,
  health: <FaHeartCircleCheck />,
  insurance: <FaHeartbeat />,
  entertainment: <FaFilm />,
  education: <FaBook />,
  other: <FaRocket />,
  tools: <FaComputer />,
};

export type IconType = ReactNode;
