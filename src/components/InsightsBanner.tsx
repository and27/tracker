import LinkButton from "./LinkButton";

const InsightsBanner = ({ insight }: { insight: string }) => {
  return (
    <div className="flex gap-10 items-center bg-white dark:bg-neutral-800/50 p-4 rounded-md mb-8">
      <div>
        <p>{insight}</p>
      </div>
      <LinkButton to="/account/insights" className="primary">
        Go to Insights
      </LinkButton>
    </div>
  );
};

export default InsightsBanner;
