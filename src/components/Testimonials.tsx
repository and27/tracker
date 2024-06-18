import { testimonials } from "../data/testimonials";

export const Testimonials = () => {
  return (
    <section className="mx-auto dark:bg-indigo-950 py-[8rem]">
      <h2 className="text-3xl font-bold text-center mb-[4rem] mx-auto">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1280px] mx-auto  text-left">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-indigo-800 dark:text-white p-8 rounded-lg"
          >
            <p className="text-lg mb-4 line-clamp-3 text-neutral-300">
              {testimonial.text}
            </p>
            <p className="text-sm font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
