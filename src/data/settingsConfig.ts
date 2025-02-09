import { FaCog, FaCogs } from "react-icons/fa";
import {
  FaBell,
  FaBullseye,
  FaChartLine,
  FaClock,
  FaMoon,
} from "react-icons/fa6";

export const icons = {
  FaMoon,
  FaBell,
  FaCog,
  FaCogs,
  FaChartLine,
  FaBullseye,
  FaClock,
};

export const settingsData = [
  {
    id: 1,
    title: "Dark Theme",
    name: "darkTheme",
    description: "Enable dark theme",
    icon: "FaMoon",
  },
  {
    id: 2,
    title: "Zen Mode",
    name: "zenMode",
    description: "Enable zen mode",
    icon: "FaCog",
  },
];

export const notificationSettings = [
  {
    id: 3,
    title: "Budget Notifications",
    name: "budgetNotifications",
    description: "Enable budget notifications",
    icon: "FaBell",
  },
  {
    id: 4,
    title: "Monthly Reports",
    name: "monthlyReports",
    description: "Enable monthly reports",
    icon: "FaBell",
  },
  {
    id: 5,
    title: "Unusual Spending Alerts",
    name: "unusualSpending",
    description: "Enable alerts for unusual spending patterns",
    icon: "FaBell",
  },
];

export const insightsSettings = [
  {
    id: 1,
    title: "Spending Insights",
    name: "spendingInsights",
    description: "Receive insights about your spending habits.",
    icon: "FaChartLine",
  },
  {
    id: 2,
    title: "Savings Goals",
    name: "savingsGoals",
    description:
      "Get insights on how you're progressing towards savings goals.",
    icon: "FaBullseye",
  },
  {
    id: 3,
    title: "Prediction Insights",
    name: "predictionInsights",
    description: "See predictions based on your spending trends.",
    icon: "FaClock",
  },
  {
    id: 4,
    title: "Advanced Insights",
    name: "advancedInsights",
    description: "Enable AI-powered deep financial insights.",
    icon: "FaCogs",
  },
];
