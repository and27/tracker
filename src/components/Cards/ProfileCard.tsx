import { useLanguageStore } from "../../store/languageStore";

type ProfileData = {
  friendly_name: string;
  description: string;
};

const ProfileCard = ({ profileData }: { profileData: ProfileData }) => {
  const { friendly_name, description } = profileData;
  const { t } = useLanguageStore();

  return (
    <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-md mb-6 border-2 border-dashed border-indigo-500">
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {t("financialProfile.title")}
      </h3>
      <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
        {friendly_name}
      </p>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-1">
        {description}
      </p>
    </div>
  );
};

export default ProfileCard;
