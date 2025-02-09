import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../context/CategoriesContext";
import { Footer } from "../components/Sections/Footer";
import Modal from "../components/Modal";
import NewCategory from "../components/Forms/NewCategory";
import CategorySection from "../components/CategorySection";
import Subtitle from "../components/Subtitle";
import SettingsList from "../components/SettingsList";
import { deleteCategoryByName } from "../utils/api/categories";
import {
  insightsSettings,
  notificationSettings,
  settingsData,
} from "../data/settingsConfig";

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
    try {
      removeCategory(category);
      const { error } = await deleteCategoryByName("user1", category);
      if (error) throw new Error(error);
    } catch (error) {
      console.error("Failed to remove category:", error);
    }
  };

  return (
    <div className="flex flex-col col-span-10 overflow-scroll">
      <main className="pt-10 px-8 dark:bg-zinc-900 min-h-screen flex flex-col gap-16">
        <section>
          <Subtitle title="Settings" />
          <SettingsList
            data={settingsData.map((s) => ({ ...s, handler: toggleTheme }))}
          />
        </section>
        <section>
          <Subtitle title="Notifications and alerts" />
          <SettingsList
            data={notificationSettings.map((s) => ({
              ...s,
              handler: () => {},
            }))}
          />
        </section>
        <section>
          <Subtitle title="Insights settings" />
          <SettingsList
            data={insightsSettings.map((s) => ({
              ...s,
              handler: () => {},
            }))}
          />
        </section>
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
