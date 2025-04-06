import Button from "../components/Button";
import { useEffect, useState } from "react";

type FinancialProfileStepProps = {
  subtitle: string;
  title: string;
  options: { id: number; option_text: string }[];
  step: number;
  onNext: (optionId: number) => void;
  onPrevious: () => void;
  onSkip: () => void;
};

const FinancialProfileStep = ({
  onNext,
  onPrevious,
  onSkip,
  ...rest
}: FinancialProfileStepProps) => {
  const { subtitle, title, options, step } = rest;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [step]);

  const optionIcons: { [key: number]: string } = {
    // **Pregunta 1: ¿Qué harías si te encuentras $500 inesperadamente?**
    1: "💰", // Los ahorro para algo importante.
    2: "📈", // Los invierto para hacerlos crecer.
    3: "🎁", // Me doy un gusto, me lo merezco.
    4: "💳", // Pago una deuda pendiente.
    5: "⚖️", // Guardo una parte y disfruto la otra.

    6: "💰", // I save them for something important.
    7: "📈", // I invest them to make them grow.
    8: "🎁", // I treat myself, I deserve it.
    9: "💳", // I use them to pay off a debt.
    10: "⚖️", // I split them: save some, enjoy some.

    // **Pregunta 2: ¿Sabes cuánto gastas cada mes? (Con caritas)**
    11: "😎📊", // Siempre sé cuánto gasté y cuánto ahorré.
    12: "🙂💰", // Más o menos, pero a veces me sorprendo.
    13: "🤯💸", // Casi nunca sé cuánto gasté.
    14: "😵‍💫💸", // Siento que el dinero desaparece solo.

    15: "😎📊", // I always know how much I spent and saved.
    16: "🙂💰", // More or less, but sometimes I get surprised.
    17: "🤯💸", // I almost never know how much I spent.
    18: "😵‍💫💸", // I feel like money just disappears.

    // **Pregunta 3: ¿Cuál es tu principal motivación financiera?**
    19: "🏡", // Tener estabilidad y cero preocupaciones.
    20: "💰", // Ganar más dinero y hacerlo crecer.
    21: "📅", // Organizarme mejor y gastar sin culpa.
    22: "🌍", // No pienso mucho en eso, solo vivo el presente.

    23: "🏡", // Having stability and no worries.
    24: "💰", // Making more money and growing it.
    25: "📅", // Getting more organized and spending without guilt.
    26: "🌍", // I don’t think much about it, I just live in the present.
  };

  return (
    <div className="w-full p-6 rounded-lg mx-auto max-w-3xl">
      <div className="h-10">
        {step > 0 && (
          <button onClick={onPrevious} className="bg-transparent p-0">
            {"← \u00A0 Volver"}
          </button>
        )}
      </div>
      <p className="text-gray-400">{subtitle}</p>
      <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {options.length === 0 ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div
                key={i}
                className="h-[50px] bg-neutral-700/50 animate-pulse rounded-lg"
              />
            ))}
          </>
        ) : (
          <>
            {options.map((option) => (
              <button
                key={option.id}
                className={`p-5 rounded-lg text-left flex gap-2 items-center border transition-all ${
                  selectedOption === option.id
                    ? "border-neutral-400 bg-gray-900"
                    : "border-neutral-800 bg-neutral-800/50 hover:border-gray-600"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <span className="text-xl">{optionIcons[option.id]}</span>
                {option.option_text}
              </button>
            ))}
          </>
        )}
      </div>
      <Button
        onClick={() => onNext(selectedOption!)}
        disabled={!selectedOption}
      >
        Continuar
      </Button>
      <Button onClick={onSkip} variant="secondary" className="ml-2 px-5">
        Omitir
      </Button>
    </div>
  );
};

export default FinancialProfileStep;
