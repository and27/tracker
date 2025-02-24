import { useLanguageStore } from "../store/languageStore";
import LinkButton from "./LinkButton";

const InsightsBanner = ({ insight }: { insight: string }) => {
  const { t } = useLanguageStore();
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start md:items-center bg-white dark:bg-neutral-800/50 p-4 rounded-md mb-8">
      <div>
        <p>{insight}</p>
      </div>
      <LinkButton to="/account/insights" className="primary">
        {t("overview.insightsBanner.button")}
      </LinkButton>
    </div>
  );
};

export default InsightsBanner;
