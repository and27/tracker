import Button from "../components/Button";
import { useEffect, useState } from "react";

type OnboardingStepProps = {
  subtitle: string;
  title: string;
  description: string;
  options: { id: number; label: string; icon: string }[];
  step: number;
  onNext: (options: string[]) => void;
  onPrevious: () => void;
  onSkip: () => void;
};

const OnboardingStep = ({
  onNext,
  onPrevious,
  onSkip,
  ...rest
}: OnboardingStepProps) => {
  const { subtitle, title, description, options, step } = rest;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const MAX_OPTIONS = 3;

  const handleSelect = (newOption: string) => {
    if (selectedOptions.includes(newOption)) {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== newOption)
      );
    } else if (selectedOptions.length < MAX_OPTIONS) {
      setSelectedOptions([...selectedOptions, newOption]);
    }
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [step]);

  return (
    <div className="w-full p-6 rounded-lg mx-auto max-w-2xl">
      <div className="h-10">
        {step > 0 && (
          <button onClick={() => onPrevious()} className="bg-transparent p-0 ">
            {"← \u00A0 Go back"}
          </button>
        )}
      </div>
      <p className="text-gray-400">{subtitle}</p>
      <h2 className="text-2xl lg:text-3xl font-outfit font-semibold text-white mb-2">
        {title}
      </h2>
      <p className="text-lg lg:text-xl font-outfit text-gray-400 mb-6">
        {description}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            className={`w-auto inline-flex items-center p-5 rounded-lg border-3 transition-all ${
              selectedOptions.includes(option.label)
                ? "border-neutral-400 bg-gray-900"
                : "border-neutral-800 bg-neutral-800/50 hover:border-gray-600"
            }`}
            onClick={() => handleSelect(option.label)}
          >
            <span className="mr-2 text-lg">{option.icon}</span>
            <span className="text-white line-clamp-1">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          onClick={() => onSkip()}
          className="disabled:bg-gray-700 bg-neutral-800/50 text-neutral-200 hover:bg-neutral-800"
        >
          Omitir
        </Button>
        <Button
          onClick={() => onNext(selectedOptions)}
          disabled={selectedOptions.length === 0}
          className="disabled:bg-gray-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep;
