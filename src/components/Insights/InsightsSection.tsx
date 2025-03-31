import { useEffect, useRef, useState } from "react";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { useInsightStore } from "../../store/insightStore";
import Button from "../Button";

type InsightSectionProps = {
  type: "categorySpending" | "monthlyComparison" | "projections";
};

export default function InsightSection({ type }: InsightSectionProps) {
  const [open, setOpen] = useState(false);
  const { insights } = useInsightStore();
  const relevantInsights = insights?.[type] ?? [];
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="z-50">
      <Button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="insight-panel"
        className="flex items-center gap-2 "
        variant="secondary"
      >
        {!open ? "Mostrar insights" : "Ocultar insights"}
        {open ? (
          <IoChevronUpCircleOutline className="w-5 h-5" />
        ) : (
          <IoChevronDownCircleOutline className="w-5 h-5" />
        )}
      </Button>

      <div
        id="insight-panel"
        role="region"
        aria-hidden={!open}
        className={`bg-neutral-800 p-0 ${
          open && "p-5"
        } pl-0 rounded absolute border-l border-indigo-500 overflow-hidden transition-all duration-700 ease-in-out ${
          open ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 text-gray-300 pl-10">
          {relevantInsights.map((insight, idx) => (
            <li
              key={idx}
              className="relative before:content-['•'] before:absolute before:left-[-12px] before:text-purple-400"
            >
              {insight.d} - {insight.p}%
              {insight.ac?.map((action) => (
                <a
                  href="#"
                  className="text-indigo-300 hover:underline"
                  onClick={() => console.log("test")}
                >
                  {action.l}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
