import { useLanguageStore } from "../store/languageStore";
import LinkButton from "./LinkButton";

const InsightsBanner = ({ insight }: { insight: string }) => {
  const { t } = useLanguageStore();
  if (!insight) return null;

  return (
    <div
      className="flex flex-col md:flex-row gap-2 md:gap-10 items-start  shadow-md dark:shadow-none 
    md:items-center bg-neutral-200/50 dark:bg-neutral-800/50 p-4 rounded-md"
    >
      <p>{insight}</p>
      <LinkButton to="/account/insights" className="secondary">
        {t("overview.insightsBanner.button")}
      </LinkButton>
    </div>
  );
};

export default InsightsBanner;
