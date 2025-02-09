import { FaClock, FaExclamationTriangle } from "react-icons/fa";

interface Prediction {
  id: number;
  description: string;
  date: string;
  impact?: "positive" | "negative" | "neutral";
  actions?: { label: string; type: string }[];
}

interface Props {
  data: Prediction[];
}

const PredictionsTrends: React.FC<Props> = ({ data }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-white">
        Predicciones & Tendencias
      </h2>
      <div className="border-l-4 border-blue-500 pl-4 space-y-4">
        {data.map((prediction) => (
          <div
            key={prediction.id}
            className="flex justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
          >
            <div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 text-lg" />
                <p className="ml-2 text-md text-white">
                  {prediction.description}
                </p>
                {prediction.impact === "negative" && (
                  <FaExclamationTriangle className="text-red-500 ml-2" />
                )}
              </div>
              <small className="text-gray-400">
                {formatDate(prediction.date)}
              </small>
            </div>
            <div className="flex gap-2">
              {prediction.actions &&
                prediction.actions?.map((action) => (
                  <button
                    key={action.label}
                    className="bg-neutral -500 text-white px-2 py-1 rounded mt-2"
                  >
                    {action.label}
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
