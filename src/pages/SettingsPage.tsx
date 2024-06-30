import { Fa1, FaBell, FaMoon } from "react-icons/fa6";
import Button from "../components/Button";
import { FaCog } from "react-icons/fa";
import Toggle from "../components/Toggle";

type settingsDataType = {
  id: number;
  title: string;
  name: "darkTheme" | "notifications" | "accountSettings";
  description: string;
  icon: string;
};

const settingsData: settingsDataType[] = [
  {
    id: 1,
    title: "Dark Theme",
    name: "darkTheme",
    description: "Enable dark theme",
    icon: "FaMoon",
  },
  {
    id: 2,
    title: "Notifications",
    name: "notifications",
    description: "Manage your notifications",
    icon: "FaBell",
  },
  {
    id: 3,
    title: "Account Settings",
    name: "accountSettings",
    description: "Manage your account settings",
    icon: "FaCog",
  },
];

const categories = [
  "Groceries",
  "Rent",
  "Utilities",
  "Transportation",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

type iconsType = {
  [key: string]: React.ElementType;
};

const SettingPage = () => {
  const icons: iconsType = {
    FaMoon: FaMoon,
    FaBell: FaBell,
    FaCog: FaCog,
  };

  return (
    <main className="col-span-10 pt-10 px-8 dark:bg-zinc-900">
      <div>
        <h2 className="text-lg lg:text-xl mb-2 font-outfit text-neutral-400">
          Settings
        </h2>
        <p>Change your account settings here.</p>
        {settingsData.map((setting) => {
          const Icon = icons[setting.icon];
          return (
            <div className="flex items-center justify-between mb-2 p-2 border-b border-gray-700">
              <div className="flex items-center">
                <Icon className="text-white text-2xl" />
                <div className="ml-4">
                  <h3 className="text-white text-lg font-semibold">
                    {setting.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{setting.description}</p>
                </div>
              </div>
              <Toggle name={setting.name} />
            </div>
          );
        })}
        <div className="flex justify-end mt-4">
          <Button>Save</Button>
        </div>
      </div>
      <h2 className="text-lg lg:text-xl mb-2 font-outfit text-neutral-400">
        Categories
      </h2>
      <p>Manage your categories here.</p>
      <div className="grid grid-cols-2 md:grid-cols-5 my-4 gap-5">
        {categories.map((category) => (
          <div className="flex px-3 py-5 bg-neutral-800/30 rounded">
            <Fa1 className="text-white text-2xl" />
            <div className="ml-4">
              <p className="text-white">{category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SettingPage;
