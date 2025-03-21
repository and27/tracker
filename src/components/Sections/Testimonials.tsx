import { useLanguageStore } from "../../store/languageStore";

type testimonial = {
  quote: string;
  name: string;
};
export const Testimonials = () => {
  const { t } = useLanguageStore();
  const testimonials = t(
    "landing.testimonials.users"
  ) as unknown as Array<testimonial>;
  return (
    <section className="mx-auto bg-neutral-900 py-[8rem] px-5">
      <h2 className="text-3xl font-bold text-center mb-[4rem] mx-auto">
        {t("landing.testimonials.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1280px] mx-auto  text-left">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-indigo-800 dark:text-white p-8 rounded-lg"
          >
            <p className="text-base mb-4 line-clamp-3 text-neutral-300">
              {testimonial.quote}
            </p>
            <p className="text-sm font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
