import { icons } from "../data/settingsConfig";
import Toggle from "./Toggle";

interface SettingsProps {
  data: {
    id: number;
    title: string;
    name: string;
    description: string;
    icon: string;
    handler: () => void;
  }[];
}

const SettingsList = ({ data }: SettingsProps) => {
  return (
    <div>
      {data.map((setting) => {
        const Icon = icons[setting.icon as keyof typeof icons];
        return (
          <div
            key={setting.id}
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
  );
};

export default SettingsList;
