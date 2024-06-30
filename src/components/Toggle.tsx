import { useState } from "react";
type options = "darkTheme" | "notifications" | "accountSettings";
type optionsType = {
  [key in options]: boolean;
};

const Toggle = ({ name }: { name: options }) => {
  const [isOn, setIsOn] = useState<optionsType>({
    darkTheme: false,
    notifications: false,
    accountSettings: false,
  });

  const toggleSwitch = (e: any) => {
    const name = e.target.name as options;
    setIsOn((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          name={name}
          checked={isOn.darkTheme}
          onChange={(e) => toggleSwitch(e)}
        />
        <div
          className={`block w-14 h-8 rounded-full ${
            isOn[name] ? "bg-green-500" : "bg-gray-200/50 "
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-gray-300 w-6 h-6 rounded-full transition-transform ${
            isOn[name] ? "transform translate-x-6 " : ""
          }`}
        ></div>
      </div>
    </label>
  );
};
export default Toggle;
