interface Action {
  label: string;
  type: string;
}

interface SpendingPattern {
  id: number;
  category: string;
  description: string;
  percentage: number;
  actions?: Action[];
}

interface Props {
  data: SpendingPattern[];
  onActionClick?: (action: Action) => void;
}

const SpendingPatterns: React.FC<Props> = ({ data, onActionClick }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-white">
        Patrones de Gasto
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((pattern) => (
          <div
            key={pattern.id}
            className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow"
          >
            <div className="flex items-center">
              <p className="ml-2 text-md">{pattern.description}</p>
            </div>

            <div className="mt-2 w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="h-4 rounded-full bg-indigo-600"
                style={{ width: `${pattern.percentage}%` }}
                aria-label={`Gasto de ${pattern.percentage}% en ${pattern.category}`}
              ></div>
            </div>

            {pattern.actions && pattern.actions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {pattern.actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => onActionClick && onActionClick(action)}
                    className="bg-neutral-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md text-sm"
                  >
                    {action.label}
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
