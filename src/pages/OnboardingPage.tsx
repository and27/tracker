import { useOnboardingStep } from "../hooks/useOnboardingStep";
import OnboardingStep from "./OnboardingStep";
import { onboardingSteps } from "../data/onboardingSteps";
import { useEffect, useState } from "react";
import { addOnboardingInfo } from "../utils/supabaseDB";
import { useNavigate } from "react-router-dom";

export type StepsInfo = {
  financialGoals: string[];
  moneyManagement: string;
  monthlyIncome: string;
};

const OnboardingPage: React.FC = () => {
  const { step, nextStep } = useOnboardingStep();
  const [stepsInfo, setStepsInfo] = useState<StepsInfo | null>(null);
  const onBoardingStep = onboardingSteps[step];
  const LAST_STEP = onboardingSteps.length - 1;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleNextStep = (options: string[]) => {
    setStepsInfo(
      (prev) =>
        ({
          ...prev,
          [onBoardingStep.id]: options,
        } as StepsInfo)
    );
    if (step === LAST_STEP) return;
    nextStep();
  };

  useEffect(() => {
    const saveOnboardingData = async () => {
      const { data, error } = await addOnboardingInfo(
        userId as string,
        stepsInfo as StepsInfo
      );
      if (error) console.error("Failed to save onboarding data:", error);
      if (data) navigate("/account/overview");
    };

    if (stepsInfo && Object.keys(stepsInfo).length === onboardingSteps.length) {
      saveOnboardingData();
    }
  }, [stepsInfo]);

  return (
    <section
      className="min-h-screen grid items-center
                max-w-2xl mx-auto"
    >
      <OnboardingStep {...onBoardingStep} step={step} onNext={handleNextStep} />
    </section>
  );
};

export default OnboardingPage;
