import { getOptionWeightsFromSupabase } from "../utils/supabaseDB";
import { useLanguageStore } from "../store/languageStore";

export const useFinancialProfileEngine = () => {
  const { t } = useLanguageStore();

  const saveAnswer = (questionId: number, optionId: number) => {
    const stored = JSON.parse(localStorage.getItem("financialAnswers") || "{}");
    stored[questionId] = optionId;
    localStorage.setItem("financialAnswers", JSON.stringify(stored));
  };

  const getAnswers = (): Record<number, number> => {
    return JSON.parse(localStorage.getItem("financialAnswers") || "{}");
  };

  const finalizeProfile = async (): Promise<{
    profile: string;
    friendly_name: string;
    description: string;
  } | null> => {
    const answers = getAnswers();
    const optionIds = Object.values(answers);

    if (!optionIds.length) return null;

    const weights = await getOptionWeightsFromSupabase(optionIds);

    const profileScores: Record<string, number> = {};

    for (const optionId of optionIds) {
      const info = weights[optionId];
      if (info) {
        profileScores[info.profile] =
          (profileScores[info.profile] || 0) + info.weight;
      }
    }

    const sorted = Object.entries(profileScores).sort((a, b) => b[1] - a[1]);
    const topProfile = sorted[0]?.[0];

    if (!topProfile) return null;

    const result = {
      profile: topProfile,
      friendly_name: t(`financialProfile.profiles.${topProfile}.friendly_name`),
      description: t(`financialProfile.profiles.${topProfile}.description`),
    };

    localStorage.setItem("financialProfileResult", JSON.stringify(result));
    return result;
  };

  return {
    saveAnswer,
    getAnswers,
    finalizeProfile,
  };
};
