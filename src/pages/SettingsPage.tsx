import { useState } from "react";
import { FaBell, FaMoon } from "react-icons/fa6";
import { FaCog, FaTimes } from "react-icons/fa";
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import Subtitle from "../components/Subtitle";
import Modal from "../components/Modal";
import NewCategory from "../components/Forms/NewCategory";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../context/CategoriesContext";
import { removeCategoryByName } from "../utils/supabaseDB";
import { Footer } from "../components/Sections/Footer";

type settingsDataType = {
  id: number;
  title: string;
  name: "darkTheme" | "notifications" | "accountSettings";
  description: string;
  icon: string;
  handler: () => void;
};

type iconsType = {
  [key: string]: React.ElementType;
};

const icons: iconsType = {
  FaMoon: FaMoon,
  FaBell: FaBell,
  FaCog: FaCog,
};
const isCategoryRequired = (category: string) => {
  return [
    "food",
    "rent",
    "transport",
    "travel",
    "shopping",
    "education",
    "entertainment",
    "insurance",
    "health",
    "other",
  ].includes(category);
};

const SettingPage = () => {
  const { categories, addCategory, removeCategory } = useCategories();
  const { toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCategory = (categoryName: string) => {
    handleModal();
    addCategory(categoryName);
  };

  const handleRemoveCategory = async (category: string) => {
    removeCategory(category);
    const { error } = await removeCategoryByName(category);
    if (error) {
      console.error(error);
      return;
    }
  };

  const settingsData: settingsDataType[] = [
    {
      id: 1,
      title: "Dark Theme",
      name: "darkTheme",
      description: "Enable dark theme",
      icon: "FaMoon",
      handler: toggleTheme,
    },
    {
      id: 2,
      title: "Notifications",
      name: "notifications",
      description: "Manage your notifications",
      icon: "FaBell",
      handler: () => {},
    },
    {
      id: 3,
      title: "Account Settings",
      name: "accountSettings",
      description: "Manage your account settings",
      icon: "FaCog",
      handler: () => {},
    },
  ];

  return (
    <div className="flex flex-col col-span-10 overflow-scroll">
      <main className="pt-10 px-8 dark:bg-zinc-900 min-h-screen">
        <div>
          <Subtitle title="Settings" />

          {settingsData.map((setting) => {
            const Icon = icons[setting.icon];
            return (
              <div className="flex items-center justify-between mb-2 p-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center my-2">
                  <Icon className="text-xl" />
                  <div className="ml-4">
                    <h3 className="font-semibold">{setting.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <Toggle name={setting.name} handler={setting.handler} />
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center">
            <div>
              <Subtitle title="Categories" />
              <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                Manage your categories here.
              </p>
            </div>
            <Button onClick={handleModal}>Add Category</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 my-4 gap-5">
            {Object.keys(categories).map((category) => (
              <div className="relative flex shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg ">
                {!isCategoryRequired(category) && (
                  <button
                    className="absolute top-0 right-0 m-0 p-2 bg-transparent"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    <FaTimes color="#888" size="12" />
                  </button>
                )}
                <div className="flex items-center my-2">
                  {categories[category].icon}
                </div>
                <div className="ml-4">
                  <p className="">{category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={handleModal} title="Add a new category">
          <NewCategory handleAddCategory={handleAddCategory} />
        </Modal>
      </main>
      <Footer />
    </div>
  );
};

export default SettingPage;
