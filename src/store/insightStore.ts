import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchConsolidatedTransactions } from "../utils/supabaseDB";
import { getAIInsights } from "../utils/insightsAIService";
import { useLanguageStore } from "./languageStore";

type SpendingPattern = {
  id: number;
  c: string;
  d: string;
  p: number;
  ac: { l: string; t: string }[];
};

interface InsightStore {
  insights: {
    spendingPatterns: SpendingPattern[];
    predictions: [];
  };
  lastUpdated: string | null;
  getInsights: (forceRefresh?: boolean) => Promise<void>;
}

export const useInsightStore = create<InsightStore>()(
  persist(
    (set, get) => ({
      insights: {
        spendingPatterns: [],
        predictions: [],
      },
      lastUpdated: null,

      getInsights: async (forceRefresh = false) => {
        const today = new Date().toISOString().split("T")[0]; //current date

        if (!forceRefresh && get().lastUpdated === today) {
          console.log("✅ Using cached insights from Zustand.");
          return;
        }

        console.log("🔄 Fetching new insights...");

        try {
          const user = localStorage.getItem("userId") as string;
          const { lang } = useLanguageStore.getState();
          const consolidatedTransactions = await fetchConsolidatedTransactions(
            user
          );

          if (!consolidatedTransactions) {
            console.error("Failed to fetch consolidated transactions.");
            return;
          }
          const newInsights = await getAIInsights(
            lang,
            consolidatedTransactions
          );

          set({
            insights: newInsights,
            lastUpdated: today,
          });

          console.log("✅ Insights updated successfully!");
        } catch (error) {
          console.error("Error fetching insights:", error);
        }
      },
    }),
    { name: "insight-storage" }
  )
);
