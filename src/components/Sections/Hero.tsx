import LinkButton from "../LinkButton";
import "../../styles/Hero.css";

const Hero = () => {
  return (
    <div className="calc-height blur-container relative px-5 grid items-center overflow-hidden bg-neutral-900">
      <img
        src="heroImage1.svg"
        alt="hero"
        className="absolute hidden md:block
         -left-[10rem] bottom-0 object-cover slide-in-left"
      />
      <img
        src="heroImage2.svg"
        alt="hero"
        className="absolute -right-[10rem] top-10 object-cover slide-in-right opacity-0"
      />
      <div className="z-10 relative text-center flex flex-col gap-5 items-center justify-center -mt-8 text-white">
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
