import { useState } from "react";
import OnboardingStep from "./OnboardingStep";

export const useOnboardingStep = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return { step, nextStep };
};

const financialGoals = [
  { id: 1, label: "Ahorrar para una meta específica", icon: "💰" },
  { id: 2, label: "Reducir mis deudas", icon: "📉" },
  { id: 3, label: "Invertir de manera inteligente", icon: "📈" },
  { id: 4, label: "Controlar mejor mis gastos", icon: "📊" },
  { id: 5, label: "Prepararme para emergencias", icon: "🚨" },
  { id: 6, label: "Mejorar mi educación financiera", icon: "📚" },
];

const moneyManagmentOptions = [
  { id: 1, label: "I use a budgeting app", icon: "📊" },
  { id: 2, label: "I have a financial advisor", icon: "👩‍💼" },
  { id: 3, label: "I track my expenses manually", icon: "🧾" },
  { id: 4, label: "I don't have a budget", icon: "🤷" },
  { id: 5, label: "I have a retirement account", icon: "🏦" },
  { id: 6, label: "I invest in the stock market", icon: "📈" },
];

const onBoardingStepGoals = {
  subtitle: "Step 1 of 3",
  title: "What are your financial goals?",
  description: "Select up to 3 options",
  options: financialGoals,
};

const onBoardingStepCategories = {
  subtitle: "Step 2 of 3",
  title: "How to you handle your money?",
  description: "Select up to 3 options",
  options: moneyManagmentOptions,
};

const OnboardingPage: React.FC = () => {
  const { step, nextStep } = useOnboardingStep();
  const onBoardingStep =
    step === 1 ? onBoardingStepGoals : onBoardingStepCategories;

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <OnboardingStep
        {...onBoardingStep}
        step={step}
        onNext={() => {
          nextStep();
        }}
      />
    </section>
  );
};

export default OnboardingPage;
