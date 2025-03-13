import { useLanguageStore } from "../store/languageStore";
import PieChart from "./Graphs/PieChart";

const dummyData = [
  { id: "1", label: "Groceries", value: 200 },
  { id: "2", label: "Transportation", value: 100 },
  { id: "3", label: "Entertainment", value: 50 },
  { id: "4", label: "Health", value: 150 },
];

export const HomePageChart = () => {
  const { t } = useLanguageStore();
  return (
    <section className="mx-auto bg-indigo-950 py-[8rem] text-center px-5">
      <h2 className="text-3xl font-bold pb-8">{t("landing.example.title")}</h2>
      <p className="max-w-96 mx-auto pb-8 leading-relaxed text-indigo-100">
        {t("landing.example.description")}
      </p>
      <div className="w-full lg:h-[30rem] h-[15rem]">
        <PieChart data={dummyData} />
      </div>
    </section>
  );
};
