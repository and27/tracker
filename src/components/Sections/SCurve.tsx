import { useLanguageStore } from "../../store/languageStore";
import LinkButton from "../LinkButton";

const Scurve = () => {
  const { t } = useLanguageStore();
  const benefits = t(
    "landing.whyPeopleJoin.description"
  ) as unknown as string[];
  return (
    <section className="mx-auto py-[8rem] bg-neutral-900 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px]  mx-auto items-center">
        <div className="grid gap-5">
          <h2 className="text-3xl font-bold">
            {t("landing.whyPeopleJoin.title")}
          </h2>
          <ul className="grid gap-2">
            {benefits.map((item: string, index: number) => (
              <li key={index} className="flex gap-2 items-center">
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <LinkButton variant="primary" to="/login">
            {t("landing.whyPeopleJoin.cta")}
          </LinkButton>
        </div>
        <img
          src="scurveImage.svg"
          alt="scurve"
          className="mt-10 md:mt-0 md:px-10"
        />
      </div>
    </section>
  );
};

export default Scurve;
