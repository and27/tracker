import { FaB } from "react-icons/fa6";

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
  {
    id: 4,
    title: "Security Settings",
    description: "Manage your security settings",
  },
  {
    id: 5,
    title: "Privacy Settings",
    description: "Manage your privacy settings",
  },
];

const SettingPage = () => {
  return (
    <main className="col-span-10 pt-10 px-8 dark:bg-zinc-900">
      <div>
        <p>Change your account settings here.</p>
        {settingsData.map((setting) => (
          <div className="flex items-center justify-between mb-4 p-2 border-b border-gray-700">
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
      </div>
    </main>
  );
};

export default SettingPage;
