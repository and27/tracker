import { useLanguageStore } from "../store/languageStore";

const LanguageSwitcher = () => {
  const { setLang, lang } = useLanguageStore();

  return (
    <select
      onChange={(e) => setLang(e.target.value)}
      value={lang}
      className="border border-neutral-700 py-2 px-4 rounded-md bg-neutral-100 dark:bg-neutral-800"
    >
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
    </select>
  );
};

export default LanguageSwitcher;
