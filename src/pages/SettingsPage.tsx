import { useTheme } from "../context/ThemeContext";
import { Footer } from "../components/Sections/Footer";
import CategorySection from "../components/CategorySection";
import Subtitle from "../components/Subtitle";
import SettingsList from "../components/SettingsList";
import { notificationSettings, settingsData } from "../data/settingsConfig";
import insightsMock from "../data/mocks/insightsMock";

const SettingPage = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <main className="lg:pt-10 px-8 dark:bg-zinc-900 min-h-screen flex flex-col gap-16">
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
        <CategorySection />
      </main>
      <Footer />
    </div>
  );
};

export default SettingPage;
