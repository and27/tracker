import { useLanguageStore } from "../../store/languageStore";

interface Action {
  l: string; // label
  t: string; // type
}

interface SpendingPattern {
  id: number;
  c: string; // category
  d: string; // description
  p: number; // percentage
  ac?: Action[];
}

interface Props {
  data: SpendingPattern[];
  onActionClick?: (action: Action) => void;
}

const SpendingPatterns: React.FC<Props> = ({ data, onActionClick }) => {
  const { t } = useLanguageStore();
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-white">
        {t("insights.expensesTitle")}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((pattern) => (
          <div
            key={pattern.id}
            className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow"
          >
            <div className="flex items-center">
              <p className="ml-2 text-md">{pattern.d}</p>
            </div>

            <div className="mt-2 w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="h-4 rounded-full bg-neutral-700"
                style={{ width: `${pattern.p}%` }}
                aria-label={`Gasto de ${pattern.p}% en ${pattern.c}`}
              ></div>
            </div>

            {pattern.ac && pattern.ac.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {pattern.ac.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => onActionClick && onActionClick(action)}
                    className="bg-neutral -500 text-white px-2 py-1 rounded "
                  >
                    {action.l}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpendingPatterns;
