import { useState } from "react";

export const useFinancialProfileStep = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  return { step, nextStep, prevStep };
};
