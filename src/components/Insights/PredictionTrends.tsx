import { FaClock, FaExclamationTriangle } from "react-icons/fa";
import { useLanguageStore } from "../../store/languageStore";

interface Prediction {
  id: number;
  d: string; // description
  dt: string; // date
  impact?: "positive" | "negative" | "neutral";
  ac?: { l: string; t: string }[]; // actions - label and type
}

interface Props {
  data: Prediction[];
}

const PredictionsTrends: React.FC<Props> = ({ data }) => {
  const { t } = useLanguageStore();

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-white">
        {t("insights.predictionsTitle")}
      </h2>
      <div className="border-l-4 border-blue-500 pl-4 space-y-4">
        {data.map((prediction) => (
          <div
            key={prediction.id}
            className="flex justify-between p-5 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
          >
            <div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 text-lg" />
                <p className="ml-2 text-md text-white">{prediction.d}</p>
                {prediction.impact === "negative" && (
                  <FaExclamationTriangle className="text-red-500 ml-2" />
                )}
              </div>
              <small className="text-gray-400">
                {formatDate(prediction.dt)}
              </small>
            </div>
            <div className="flex gap-2">
              {prediction.ac &&
                prediction.ac?.map((action) => (
                  <button
                    key={action.l}
                    className="bg-neutral -500 text-white px-2 py-1 rounded"
                  >
                    {action.l}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? dateString
    : date.toLocaleDateString("en-US", options);
};

export default PredictionsTrends;
