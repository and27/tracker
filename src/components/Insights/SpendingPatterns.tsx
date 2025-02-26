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
    <section className="my-10">
      <h2 className="text-xl font-semibold mb-3 text-neutral-700 dark:text-neutral-200">
        {t("insights.expensesTitle")}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((pattern) => (
          <div
            key={pattern.id}
            className="flex flex-col gap-2 p-5 bg-white dark:bg-neutral-800/50 rounded-lg"
          >
            <div className="flex items-center">
              <p className="text-md">{pattern.d}</p>
            </div>

            <div className="mt-2 w-full bg-neutral-300 rounded-full h-4 dark:bg-neutral-900">
              <div
                className="h-4 rounded-full bg-green-500"
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
                    className="bg-transparent border border-neutral-800
                     dark:border-neutral-500 text-neutral-700 dark:text-neutral-300 rounded "
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
