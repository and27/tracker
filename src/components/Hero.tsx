import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="text-center flex flex-col gap-5 items-center calc-height justify-center w-[46rem] mx-auto">
      <p className="uppercase text-slate-600">
        The new standard decentralized trading platform
      </p>
      <h1 className="font-bold">Trade decentralized between blockchains</h1>
      <p className="text-slate-600 py-2">
        Trade tokens on Uniswap, Sushiswap, and other decentralized exchanges
        directly from your wallet. No account needed. No limits. No middlemen.
      </p>
      <Link to="/login">
        <button className="bg-teal-500 rounded px-5 text-white w-48">
          Start trading
        </button>
      </Link>
    </div>
  );
};

export default Hero;
