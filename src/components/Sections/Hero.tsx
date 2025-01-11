import LinkButton from "../LinkButton";
import "../../styles/Hero.css";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle at center center, transparent, rgb(22,22,22)), repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 2px, transparent 2px, transparent 10px, rgb(33,33,33) 10px, rgb(33,33,33) 11px, transparent 11px, transparent 21px), repeating-linear-gradient(45deg, rgb(47,47,47) 0px, rgb(47,47,47) 4px, transparent 4px, transparent 8px), linear-gradient(90deg, rgb(33,33,33), rgb(33,33,33))",
      }}
      className="calc-height relative px-5 grid items-center overflow-hidden"
    >
      <img
        src="heroImage1.svg"
        alt="hero"
        className="absolute hidden md:block
         -left-[10rem] bottom-0 object-cover slide-in-left"
      />

      <img
        src="heroImage2.svg"
        alt="hero"
        className="
        size-[15rem] md:size-[20rem] lg:size-[25rem] xl:size-[30rem] 2xl:size-[35rem]    
        absolute -right-[7rem] top-20 xl:top-10 slide-in-right opacity-0"
      />
      <div className="z-10 relative text-center flex flex-col gap-5 items-center justify-center -mt-8 text-white">
        <img src="/logoCard.svg" alt="logo" width="24" height="24" />

        <p className="text-sm md:text-base z-10 tracking-wide bg-neutral-950/60 px-5 py-1 rounded-full">
          The Ultimate Budget Tracking App
        </p>
        <h1 className="font-bold font-outfit md:w-[36rem] text-center mx-auto md:text-6xl">
          Master Your Finances with Ease
        </h1>
        <p className="py-2 text-base md:w-[30rem]">
          Gain control over your spending and achieve your financial goals with
          our intuitive app.
        </p>
        <LinkButton to="/login">Start tracking now</LinkButton>
      </div>
    </div>
  );
};

export default Hero;
