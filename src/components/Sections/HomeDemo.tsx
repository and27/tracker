import { FaWallet, FaChartLine, FaListUl } from "react-icons/fa";
import { useLanguageStore } from "../../store/languageStore";

const HomeDemo = () => {
  const { t } = useLanguageStore();
  const steps = [
    {
      title: t("landing.howItWorks.steps.0.title"),
      description: t("landing.howItWorks.steps.0.description"),
      icon: <FaWallet className="text-blue-600 text-3xl" />,
    },
    {
      title: t("landing.howItWorks.steps.1.title"),
      description: t("landing.howItWorks.steps.1.description"),
      icon: <FaListUl className="text-green-600 text-3xl" />,
    },
    {
      title: t("landing.howItWorks.steps.2.title"),
      description: t("landing.howItWorks.steps.2.description"),
      icon: <FaChartLine className="text-purple-600 text-3xl" />,
    },
  ];

  return (
    <section
      id="demo"
      className="bg-indigo-950 pb-[8rem] text-center px-6 text-white"
    >
      <h2 className="text-3xl font-bold mb-4">
        {t("landing.howItWorks.title")}
      </h2>
      <div className="max-w-[1000px] mx-auto mb-4">
        <p className="mb-8">{t("landing.howItWorks.description")}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 border rounded-xl shadow-md">
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-gray-100 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeDemo;
