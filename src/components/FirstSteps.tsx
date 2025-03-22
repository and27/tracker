import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button";

const FirstSteps = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Completa tu quiz inicial",
      description: "Responde 3 preguntas para personalizar tu experiencia.",
      completed: localStorage.getItem("onboardingCompleted") === "true",
      action: () => navigate("/onboarding"),
    },
    {
      id: 2,
      title: "Agrega tu primera transacción",
      description: "Registra tu primer gasto o ingreso.",
      completed: localStorage.getItem("hasTransaction") === "true",
      action: () => navigate("/account/transaction"),
    },
    {
      id: 3,
      title: "Define tu primer presupuesto",
      description: "Establece límites para mejorar tu control financiero.",
      completed: localStorage.getItem("hasBudget") === "true",
      action: () => navigate("/account/settings"),
    },
  ]);

  // Optional: puedes actualizar dinámicamente desde store o API
  useEffect(() => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id === 1) {
          return {
            ...step,
            completed: localStorage.getItem("onboardingCompleted") === "true",
          };
        }
        if (step.id === 2) {
          return {
            ...step,
            completed: localStorage.getItem("hasTransaction") === "true",
          };
        }
        if (step.id === 3) {
          return {
            ...step,
            completed: localStorage.getItem("hasBudget") === "true",
          };
        }
        return step;
      })
    );
  }, []);

  const allCompleted = steps.every((step) => step.completed);

  if (allCompleted) return null;

  return (
    <section className="bg-neutral-800 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        🧭 Primeros pasos para empezar
      </h2>
      <ul className="grid md:grid-cols-3 gap-5">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex flex-col items-start justify-between gap-4 p-4 rounded-md border ${
              step.completed
                ? "bg-neutral-100 dark:bg-zinc-700 border-neutral-200 dark:border-zinc-600 opacity-60"
                : "bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-700"
            }`}
          >
            <div className="flex items-start gap-3">
              {step.completed ? (
                <FaCheckCircle className="text-green-500 mt-1" />
              ) : (
                <FaRegCircle className="text-indigo-500 mt-1" />
              )}
              <div>
                <p className="font-medium text-neutral-800 dark:text-neutral-100">
                  {step.title}
                </p>
                {/* <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p> */}
              </div>
            </div>
            {!step.completed && (
              <Button onClick={step.action} type="button" className="py-1.5">
                Ir ahora →
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FirstSteps;
