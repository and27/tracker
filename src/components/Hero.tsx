import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" calc-height blur-container relative px-5">
      <div className="z-10 relative text-center flex flex-col gap-5 items-center justify-center h-screen">
        <p className="text-slate-600 dark:text-slate-100 z-10 tracking-wide">
          The Ultimate Budget Tracking App
        </p>
        <h1 className="font-bold font-outfit text-slate-600 dark:text-slate-100 md:w-[36rem] text-center mx-auto md:text-6xl">
          Master Your Finances with Ease
        </h1>
        <p className="text-slate-600 dark:text-slate-100 py-2 text-base md:w-[30rem]">
          Gain control over your spending and achieve your financial goals with
          our intuitive app.
        </p>
        <Link to="/login">
          <button className="bg-indigo-600 rounded px-5 text-white w-48">
            Start tracking now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
