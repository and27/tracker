import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStep } from "../hooks/useOnboardingStep";
import OnboardingStep from "./OnboardingStep";
import { useLanguageStore } from "../store/languageStore";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  getOnboardingOptions,
  getOnboardingQuestions,
  saveOnboardingAnswer,
  updateUserProfile,
} from "../utils/supabaseDB";

export type UserOnboardingInfo = {
  [key: number]: number;
};

const OnboardingPage: React.FC = () => {
  type Question = {
    id: number;
    question_text: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<{ [key: number]: any[] }>({});

  const { step, nextStep, prevStep } = useOnboardingStep();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { lang } = useLanguageStore();

  useEffect(() => {
    const fetchOnboardingData = async () => {
      const loadedQuestions = await getOnboardingQuestions(lang);
      setQuestions(loadedQuestions);

      const optionsMap: { [key: number]: any[] } = {};
      for (const question of loadedQuestions) {
        const questionOptions = await getOnboardingOptions(question.id, lang);
        optionsMap[question.id] = questionOptions;
      }
      setOptions(optionsMap);
    };

    fetchOnboardingData();
  }, [lang]);

  const activeStep = questions[step];
  const LAST_STEP_INDEX = questions.length - 1;

  const handleStepCompletion = async (selectedOptionId: number) => {
    await saveOnboardingAnswer(
      userId as string,
      activeStep.id,
      selectedOptionId
    );

    if (step < LAST_STEP_INDEX) {
      nextStep();
    } else {
      await updateUserProfile(userId as string, {
        onboarding_completed: true,
      });
      navigate("/account/overview");
    }
  };

  const handleSkip = () => {
    navigate("/account/overview");
  };

  return (
    <section className="min-h-screen grid items-center">
      {activeStep && (
        <OnboardingStep
          subtitle={`Pregunta ${step + 1} de ${questions.length}`}
          title={activeStep.question_text}
          options={options[activeStep.id] || []}
          step={step}
          onNext={handleStepCompletion}
          onPrevious={prevStep}
          onSkip={handleSkip}
        />
      )}
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>
    </section>
  );
};

export default OnboardingPage;
