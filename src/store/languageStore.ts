import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import es from "../data/locales/es.json";
import en from "../data/locales/en.json";

const translations = { es, en };

interface LanguageStore {
  lang: string;
  t: (key: string, replacements?: Record<string, string>) => string;
  setLang: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: "en",
      t: (key, replacements) => {
        let text =
          key
            .split(".")
            .reduce(
              (o, k) => (o || {})[k],
              (translations as Record<string, any>)[get().lang]
            ) || key;
        if (replacements) {
          Object.entries(replacements).forEach(([placeholder, value]) => {
            text = text.replace(`{{${placeholder}}}`, value);
          });
        }
        return text;
      },
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
