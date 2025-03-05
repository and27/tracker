import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStep } from "../hooks/useOnboardingStep";
import { addOnboardingInfo } from "../utils/supabaseDB";
import OnboardingStep from "./OnboardingStep";
import { useLanguageStore } from "../store/languageStore";
import LanguageSwitcher from "../components/LanguageSwitcher";

export type UserOnboardingInfo = {
  financialGoals: string[];
  moneyManagement: string[];
};

const OnboardingPage: React.FC = () => {
  const [userOnboardingInfo, setUserOnboardingInfo] =
    useState<UserOnboardingInfo | null>(null);
  const { step, nextStep, prevStep } = useOnboardingStep();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const financialGoals = [
    { id: 1, label: t("onboarding.financialGoals.1"), icon: "💰" },
    { id: 2, label: t("onboarding.financialGoals.2"), icon: "📉" },
    { id: 3, label: t("onboarding.financialGoals.3"), icon: "📈" },
    { id: 4, label: t("onboarding.financialGoals.4"), icon: "📊" },
    { id: 5, label: t("onboarding.financialGoals.5"), icon: "🚨" },
    { id: 6, label: t("onboarding.financialGoals.6"), icon: "📚" },
  ];

  const moneyManagementOptions = [
    { id: 1, label: t("onboarding.moneyManagementOptions.1"), icon: "📊" },
    { id: 2, label: t("onboarding.moneyManagementOptions.2"), icon: "👩‍💼" },
    { id: 3, label: t("onboarding.moneyManagementOptions.3"), icon: "🧾" },
    { id: 4, label: t("onboarding.moneyManagementOptions.4"), icon: "🤷" },
    { id: 5, label: t("onboarding.moneyManagementOptions.5"), icon: "🏦" },
    { id: 6, label: t("onboarding.moneyManagementOptions.6"), icon: "📈" },
  ];

  const onboardingSteps = [
    {
      id: "financialGoals",
      subtitle: t("onboarding.step1.subtitle"),
      title: t("onboarding.step1.title"),
      description: t("onboarding.step1.description"),
      options: financialGoals,
    },
    {
      id: "moneyManagement",
      subtitle: t("onboarding.step2.subtitle"),
      title: t("onboarding.step2.title"),
      description: t("onboarding.step2.description"),
      options: moneyManagementOptions,
    },
  ];
  const activeStep = onboardingSteps[step];
  const LAST_STEP_INDEX = onboardingSteps.length - 1;

  const handleStepCompletion = (options: string[]) => {
    setUserOnboardingInfo(
      (prev) =>
        ({
          ...prev,
          [activeStep.id]: options,
        } as UserOnboardingInfo)
    );
    if (step === LAST_STEP_INDEX) return;
    nextStep();
  };

  useEffect(() => {
    const submitOnboardingData = async () => {
      const { data, error } = await addOnboardingInfo(
        userId as string,
        userOnboardingInfo as UserOnboardingInfo
      );
      if (error) console.error("Failed to save onboarding data:", error);
      if (data) navigate("/account/overview");
    };

    if (
      userOnboardingInfo &&
      Object.keys(userOnboardingInfo).length === onboardingSteps.length
    ) {
      submitOnboardingData();
    }
  }, [userOnboardingInfo]);

  const handleSkip = () => {
    navigate("/account/overview");
  };

  return (
    <section className="min-h-screen grid items-center">
      <OnboardingStep
        {...activeStep}
        step={step}
        onNext={handleStepCompletion}
        onPrevious={prevStep}
        onSkip={handleSkip}
      />
      <LanguageSwitcher />
    </section>
  );
};

export default OnboardingPage;
