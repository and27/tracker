import { Fa1, FaB } from "react-icons/fa6";
import Button from "../components/Button";

type settingsDataType = {
  id: number;
  title: string;
  description: string;
};

const settingsData: settingsDataType[] = [
  {
    id: 1,
    title: "Beer Settings",
    description: "Manage your beer preferences",
  },
  {
    id: 2,
    title: "Notifications",
    description: "Manage your notifications",
  },
  {
    id: 3,
    title: "Account Settings",
    description: "Manage your account settings",
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

const SettingPage = () => {
  return (
    <main className="col-span-10 pt-10 px-8 dark:bg-zinc-900">
      <div>
        <h2 className="text-lg lg:text-xl mb-2 font-outfit text-neutral-400">
          Settings
        </h2>
        <p>Change your account settings here.</p>
        {settingsData.map((setting) => (
          <div className="flex items-center justify-between mb-2 p-2 border-b border-gray-700">
            <div className="flex items-center">
              <FaB className="text-white text-2xl" />
              <div className="ml-4">
                <h3 className="text-white text-lg font-semibold">
                  {setting.title}
                </h3>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
            </div>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="toggle-checkbox hidden" />
              <span className="toggle-label relative inline-block w-10 h-6 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out">
                <span className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out"></span>
              </span>
            </label>
          </div>
        ))}
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
