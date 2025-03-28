import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/languageStore";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {
  getFinancialProfileOptions,
  getFinancialProfileQuestions,
  saveFinancialProfileAnswer,
  updateUserProfile,
} from "../utils/supabaseDB";
import { useFinancialProfileStep } from "../hooks/useFinancialProfileStep";
import FinancialProfileStep from "./FinancialProfileStep";

export type UserFinancialProfileInfo = {
  [key: number]: number;
};

const FinancialProfilePage: React.FC = () => {
  type Question = {
    id: number;
    question_text: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<{ [key: number]: any[] }>({});

  const { step, nextStep, prevStep } = useFinancialProfileStep();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { lang } = useLanguageStore();

  useEffect(() => {
    const fetchFinancialProfileData = async () => {
      const loadedQuestions = await getFinancialProfileQuestions(lang);
      setQuestions(loadedQuestions);

      const optionsMap: { [key: number]: any[] } = {};
      for (const question of loadedQuestions) {
        const questionOptions = await getFinancialProfileOptions(
          question.id,
          lang
        );
        optionsMap[question.id] = questionOptions;
      }
      setOptions(optionsMap);
    };

    fetchFinancialProfileData();
  }, [lang]);

  const activeStep = questions[step];
  const LAST_STEP_INDEX = questions.length - 1;

  const handleStepCompletion = async (selectedOptionId: number) => {
    await saveFinancialProfileAnswer(
      userId as string,
      activeStep.id,
      selectedOptionId
    );

    if (step < LAST_STEP_INDEX) {
      nextStep();
    } else {
      await updateUserProfile(userId as string, {
        financial_profile_completed: true,
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
        <FinancialProfileStep
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

export default FinancialProfilePage;
