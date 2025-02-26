import { useLanguageStore } from "../store/languageStore";

type LanguageKeys = "en" | "es";

const categoryTranslations: Record<LanguageKeys, Record<string, string>> = {
  en: {
    food: "Food",
    transport: "Transport",
    entertainment: "Entertainment",
    housing: "Housing",
    health: "Health",
    insurance: "Insurance",
    clothing: "Clothing",
    tools: "Tools",
    travel: "Travel",
    emergency: "Emergency",
    education: "Education",
    other: "Other",
  },
  es: {
    food: "Comida",
    transport: "Transporte",
    entertainment: "Entretenimiento",
    housing: "Vivienda",
    health: "Salud",
    insurance: "Seguro",
    clothing: "Ropa",
    tools: "Herramientas",
    travel: "Viaje",
    emergency: "Emergencia",
    education: "Educación",
    other: "Otro",
  },
};

/**
 * Traduce una categoría basada en el idioma actual del usuario.
 * @param categoryKey - Clave de la categoría (en inglés)
 * @returns Nombre de la categoría traducido
 */
export const translateCategory = (categoryKey: string): string => {
  const { lang } = useLanguageStore.getState();
  return (
    categoryTranslations[lang as LanguageKeys]?.[categoryKey] || categoryKey
  );
};
