import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLanguageStore } from "../store/languageStore";
import LinkButton from "./LinkButton";
import Subtitle from "./Subtitle";

const FirstSteps = () => {
  const { t, lang } = useLanguageStore();

  const [steps, setSteps] = useState<
    {
      id: number;
      title: string;
      description: string;
      completed: boolean;
      to: string;
    }[]
  >([]);

  useEffect(() => {
    setSteps([
      {
        id: 1,
        title: t("firstSteps.steps.quiz.title"),
        description: t("firstSteps.steps.quiz.description"),
        completed: localStorage.getItem("onboardingCompleted") === "true",
        to: "/onboarding",
      },
      {
        id: 2,
        title: t("firstSteps.steps.transaction.title"),
        description: t("firstSteps.steps.transaction.description"),
        completed: localStorage.getItem("hasTransaction") === "true",
        to: "/account/transaction",
      },
      {
        id: 3,
        title: t("firstSteps.steps.budget.title"),
        description: t("firstSteps.steps.budget.description"),
        completed: localStorage.getItem("hasBudget") === "true",
        to: "/account/budget",
      },
    ]);
  }, [lang, t]);

  const firstIncompleteId = steps.find((s) => !s.completed)?.id;
  const allCompleted = steps.every((step) => step.completed);
  const completedCount = steps.filter((s) => s.completed).length;
  const remainingSteps = steps.length - completedCount;

  if (allCompleted) return null;

  const progressText =
    remainingSteps === 1
      ? t("firstSteps.progress.one")
      : t("firstSteps.progress.other", { count: String(remainingSteps) });

  return (
    <section className="rounded-2xl mb-8 shadow-md">
      <Subtitle title={t("firstSteps.title")} />
      <p className="text-sm text-neutral-300 mt-2 mb-4">{progressText}</p>

      <ul className="grid md:grid-cols-3 gap-5">
        {steps.map((step) => {
          const isFirstIncomplete = step.id === firstIncompleteId;

          return (
            <li
              key={step.id}
              className={`flex flex-col justify-between p-5 rounded-xl border shadow-sm ${
                step.completed
                  ? "bg-neutral-100 dark:bg-zinc-800 border-neutral-200 dark:border-zinc-600 opacity-60"
                  : "bg-white dark:bg-zinc-900 border-indigo-300 dark:border-indigo-700"
              }`}
            >
              <div className="flex items-start gap-3 h-full">
                {step.completed ? (
                  <FaCheckCircle className="text-green-500 mt-1 text-lg" />
                ) : (
                  <FaRegCircle className="text-indigo-500 mt-1 text-lg" />
                )}
                <div className="flex flex-col h-full gap-2">
                  <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                    {step.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {step.description}
                  </p>
                  {!step.completed && (
                    <LinkButton
                      to={step.to}
                      variant={isFirstIncomplete ? "primary" : "secondary"}
                      className={`py-1.5 px-4 w-fit ${
                        isFirstIncomplete ? "primary" : ""
                      }`}
                    >
                      {t("firstSteps.ctaPrimary")}
                    </LinkButton>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FirstSteps;
