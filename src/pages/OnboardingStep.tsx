import Button from "../components/Button";
import { useEffect, useState } from "react";

type OnboardingStepProps = {
  subtitle: string;
  title: string;
  description: string;
  options: { id: number; label: string; icon: string }[];
  step: number;
  onNext: (options: string[]) => void;
};

const OnboardingStep = ({
  subtitle,
  title,
  description,
  options,
  step,
  onNext,
}: OnboardingStepProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const MAX_OPTIONS = step === 0 ? 3 : 1;

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
    <div className="w-full p-6 rounded-lg mx-auto">
      <h3 className="text-gray-400 mb-4">{subtitle}</h3>
      <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            className={`flex items-center p-4 rounded-lg border-2 transition-all ${
              selectedOptions.includes(option.label)
                ? "border-neutral-400 bg-gray-800"
                : "border-neutral-800 bg-gray-900 hover:border-gray-600"
            }`}
            onClick={() => handleSelect(option.label)}
          >
            <span className="mr-2 text-lg">{option.icon}</span>
            <span className="text-white text-sm">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => onNext(selectedOptions)}
          disabled={selectedOptions.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep;
