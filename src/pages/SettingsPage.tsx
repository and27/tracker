import { Fa1, FaBell, FaMoon } from "react-icons/fa6";
import Button from "../components/Button";
import { FaCog } from "react-icons/fa";
import Toggle from "../components/Toggle";
import { useTheme } from "../context/ThemeContext";
import Subtitle from "../components/Subtitle";

type settingsDataType = {
  id: number;
  title: string;
  name: "darkTheme" | "notifications" | "accountSettings";
  description: string;
  icon: string;
  handler: () => void;
};

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

const icons: iconsType = {
  FaMoon: FaMoon,
  FaBell: FaBell,
  FaCog: FaCog,
};

const SettingPage = () => {
  const { toggleTheme } = useTheme();

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
    <main className="col-span-10 pt-10 px-8 dark:bg-zinc-900 min-h-screen">
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
        <div className="flex justify-end mt-4">
          <Button>Save</Button>
        </div>
      </div>
      <Subtitle title="Categories" />
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
        Manage your categories here.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 my-4 gap-5">
        {categories.map((category) => (
          <div className="flex shadow-lg dark:shadow-none p-5 bg-white/80 dark:bg-neutral-800/50 rounded-lg ">
            <Fa1 className="text-2xl" />
            <div className="ml-4">
              <p className="">{category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SettingPage;
