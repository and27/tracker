import LinkButton from "../LinkButton";
import "../../styles/Hero.css";
import { useLanguageStore } from "../../store/languageStore";
import LanguageSwitcher from "../LanguageSwitcher";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useLanguageStore();

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle at center center, transparent, rgb(22,22,22)), repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 2px, transparent 2px, transparent 10px, rgb(33,33,33) 10px, rgb(33,33,33) 11px, transparent 11px, transparent 21px), repeating-linear-gradient(45deg, rgb(47,47,47) 0px, rgb(47,47,47) 4px, transparent 4px, transparent 8px), linear-gradient(90deg, rgb(33,33,33), rgb(33,33,33))",
      }}
      className="h-full relative px-5 grid items-center overflow-hidden"
    >
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>

      <motion.img
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        src="heroImage1.svg"
        alt="hero"
        className="absolute hidden md:block -left-[10rem] bottom-0 object-cover"
      />

      <motion.img
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        src="heroImage2.svg"
        alt="hero"
        className="size-[15rem] md:size-[20rem] lg:size-[25rem] xl:size-[30rem] 2xl:size-[35rem]    
        absolute -right-[7rem] top-20 xl:top-14"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10 relative text-center flex flex-col gap-5 items-center justify-center text-white"
      >
        <img src="/logoCard.svg" alt="logo" width="24" height="24" />

        <p className="text-sm md:text-base z-10 tracking-wide bg-neutral-950/60 px-5 py-1 rounded-full">
          {t("landing.subtitle")}
        </p>
        <h1 className="font-bold font-outfit md:w-[36rem] text-center mx-auto md:text-6xl">
          {t("landing.title")}
        </h1>
        <p className="py-2 text-base md:w-[30rem]">
          {t("landing.description")}
        </p>
        <div className="flex gap-3">
          <LinkButton to="/login" variant="primary">
            {t("landing.cta")}
          </LinkButton>
          <LinkButton variant="secondary" href="#demo">
            {t("landing.ctaSecondary")}
          </LinkButton>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
