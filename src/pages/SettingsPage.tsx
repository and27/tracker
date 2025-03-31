import { useTheme } from "../context/ThemeContext";
import { Footer } from "../components/Sections/Footer";
import Subtitle from "../components/Subtitle";
import SettingsList from "../components/SettingsList";
import { notificationSettings, settingsData } from "../data/settingsConfig";
import { useLanguageStore } from "../store/languageStore";

const SettingPage = () => {
  const { toggleTheme } = useTheme();
  const { t } = useLanguageStore();

  return (
    <div className="flex flex-col col-span-12 lg:col-span-10 overflow-scroll">
      <main className="lg:pt-10 px-8 dark:bg-zinc-900 min-h-screen flex flex-col gap-16">
        <section>
          <Subtitle title={t("settings.title")} />
          <SettingsList
            data={settingsData.map((s) => ({ ...s, handler: toggleTheme }))}
          />
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
      </main>
      <Footer />
    </div>
  );
};

export default SettingPage;
