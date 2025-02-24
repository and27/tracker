import { useTheme } from "../context/ThemeContext";
import { Footer } from "../components/Sections/Footer";
import CategorySection from "../components/CategorySection";
import Subtitle from "../components/Subtitle";
import SettingsList from "../components/SettingsList";
import { notificationSettings, settingsData } from "../data/settingsConfig";
import { useLanguageStore } from "../store/languageStore";

const SettingPage = () => {
  const { toggleTheme } = useTheme();
  const { setLang, t } = useLanguageStore();

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <main className="lg:pt-10 px-8 dark:bg-zinc-900 min-h-screen flex flex-col gap-16">
        <section>
          <Subtitle title={t("settings.title")} />
          <SettingsList
            data={settingsData.map((s) => ({ ...s, handler: toggleTheme }))}
          />
          <select
            onChange={(e) => setLang(e.target.value)}
            className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
          </select>
        </section>
        <section>
          <Subtitle title={t("settings.notificationsTitle")} />
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
