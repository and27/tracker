import { useLanguageStore } from "../../store/languageStore";
import LinkButton from "../LinkButton";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useRef } from "react";

const Scurve = () => {
  const { t } = useLanguageStore();
  const benefits = t(
    "landing.whyPeopleJoin.description"
  ) as unknown as string[];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="mx-auto py-[8rem] bg-neutral-900 px-5" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px] mx-auto items-center">
        <motion.div
          className="grid gap-5"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-2"
            variants={item}
          >
            {t("landing.whyPeopleJoin.title")}
          </motion.h2>

          <motion.ul className="grid gap-5 mb-4">
            {benefits.map((itemText: string, index: number) => (
              <motion.li
                key={index}
                className="flex gap-3 items-center text-neutral-100 "
                variants={item}
              >
                <FaCheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                <p className="text-base leading-snug">{itemText}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={item}>
            <LinkButton variant="primary" to="/login">
              {t("landing.whyPeopleJoin.cta")}
            </LinkButton>
          </motion.div>
        </motion.div>

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
