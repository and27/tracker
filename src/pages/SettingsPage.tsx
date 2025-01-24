import { useState } from "react";
import { FaBell, FaMoon } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import Toggle from "../components/Toggle";
import Subtitle from "../components/Subtitle";
import Modal from "../components/Modal";
import NewCategory from "../components/Forms/NewCategory";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../context/CategoriesContext";
import { Footer } from "../components/Sections/Footer";
import { deleteCategoryByName } from "../utils/api/categories";
import CategorySection from "../components/CategorySection";

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

const SettingPage = () => {
  const { addCategory, removeCategory } = useCategories();
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
    const { error } = await deleteCategoryByName("user1", category);
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
          {settingsData.map((setting, idx) => {
            const Icon = icons[setting.icon];
            return (
              <div
                key={idx}
                className="flex items-center justify-between mb-2 p-2 border-b border-gray-200 dark:border-gray-700"
              >
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

        <CategorySection
          handleRemoveCategory={handleRemoveCategory}
          handleModal={handleModal}
        />
        <Modal isOpen={isOpen} onClose={handleModal} title="Add a new category">
          <NewCategory handleAddCategory={handleAddCategory} />
        </Modal>
      </main>
      <Footer />
    </div>
  );
};

export default SettingPage;
