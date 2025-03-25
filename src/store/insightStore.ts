import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchConsolidatedTransactions } from "../utils/supabaseDB";
import { useLanguageStore } from "./languageStore";
import {
  getSmartInsights,
  InsightItem,
} from "../utils/smartsInsightsAIService";

interface SmartInsightByChart {
  categorySpending: InsightItem[];
  monthlyComparison: InsightItem[];
  projections: InsightItem[];
}

interface InsightStore {
  insights: SmartInsightByChart;
  isLoading: boolean;
  lastUpdated: string | null;
  getInsights: (forceRefresh?: boolean) => Promise<void>;
  clearInsights: () => void;
}

export const useInsightStore = create<InsightStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      insights: {
        categorySpending: [],
        monthlyComparison: [],
        projections: [],
      },
      lastUpdated: null,

      getInsights: async (forceRefresh = false) => {
        const today = new Date().toISOString().split("T")[0];

        if (!forceRefresh && get().lastUpdated === today) {
          console.log("✅ Using cached smart insights from Zustand.");
          return;
        }

        console.log("🔄 Fetching new smart insights...");
        set({ isLoading: true });

        try {
          const user = localStorage.getItem("userId") as string;
          const { lang } = useLanguageStore.getState();

          const consolidatedTransactions = await fetchConsolidatedTransactions(
            user
          );

          if (!consolidatedTransactions) {
            console.error("❌ Failed to fetch consolidated transactions.");
            set({ isLoading: false });
            return;
          }

          const smart = await getSmartInsights(lang, consolidatedTransactions);

          if (!smart?.byChart) {
            console.error("❌ No insights returned.");
            set({ isLoading: false });
            return;
          }

          set({
            insights: smart.byChart,
            lastUpdated: today,
            isLoading: false,
          });

          console.log("✅ Smart insights updated successfully!");
        } catch (error) {
          console.error("❌ Error fetching smart insights:", error);
          set({ isLoading: false });
        }
      },

      clearInsights: () => {
        set({
          insights: {
            categorySpending: [],
            monthlyComparison: [],
            projections: [],
          },
          lastUpdated: null,
        });
      },
    }),
    {
      name: "insight-storage",
    }
  )
);
