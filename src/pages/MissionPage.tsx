import {
  FaCheckCircle,
  FaTasks,
  FaTrophy,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLanguageStore } from "../store/languageStore";
import Button from "../components/Button";

interface Mission {
  id: number;
  category: "savings" | "debt" | "investment";
  title: string;
  description: string;
  reward: number;
  status: "pending" | "completed";
  urgency?: boolean;
  actionLabel: string;
}

const MissionsPage: React.FC = () => {
  const { t } = useLanguageStore();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [level, setLevel] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loadUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      //   const userGoals = await fetchUserGoals(userId);
      //   const userLevelData = await fetchUserLevel(userId);
      const userGoals = [
        "Ahorrar para una meta específica",
        "Reducir mis deudas",
      ];
      const userLevelData = { level: "Principiante", progress: 30 };

      const personalizedMissions = generateMissions(userGoals);
      setMissions(personalizedMissions);

      setLevel(userLevelData.level);
      setProgress(userLevelData.progress);
    };

    loadUserData();
  }, []);

  const completeMission = (missionId: number) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === missionId ? { ...mission, status: "completed" } : mission
      )
    );
  };

  return (
    <section className="col-span-12 lg:col-span-10 pt-5 md:pt-10 px-5 md:px-8 dark:bg-zinc-900 min-h-screen">
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200">
          {t("missions.levelTitle", { level })}
        </h2>
        <p className="text-gray-500">{t("missions.levelProgress")}</p>
        <div className="w-full max-w-xs bg-gray-300 rounded-full h-3 dark:bg-gray-700 mt-2">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="border-l-4 border-green-500 pl-4 space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="flex justify-between p-5 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
          >
            <div>
              <div className="flex items-center">
                {mission.category === "savings" && (
                  <FaTrophy className="text-yellow-500 text-lg" />
                )}
                {mission.category === "debt" && (
                  <FaClock className="text-blue-500 text-lg" />
                )}
                {mission.category === "investment" && (
                  <FaTasks className="text-green-500 text-lg" />
                )}
                <p className="ml-2 text-md text-neutral-700 dark:text-white">
                  {mission.title}
                </p>
              </div>
              <small className="text-gray-500">{mission.description}</small>
              <p className="text-sm font-semibold mt-1 text-green-500">
                +{mission.reward} {t("missions.points")}
              </p>
            </div>
            <div>
              {mission.urgency && (
                <FaExclamationTriangle className="text-red-500" />
              )}
              {mission.status === "pending" ? (
                <Button
                  onClick={() => completeMission(mission.id)}
                  className=""
                >
                  {mission.actionLabel}
                </Button>
              ) : (
                <span className="text-green-500 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  {t("missions.completed")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const generateMissions = (goals: string[]): Mission[] => {
  const missionTemplates = {
    "Ahorrar para una meta específica": {
      category: "savings",
      title: "🚀 Ahorra sin dolor: $50 menos en compras innecesarias",
      description: "Reduce gastos innecesarios para acercarte a tu meta.",
      reward: 50,
      actionLabel: "Marcar como completado",
    },
    "Reducir mis deudas": {
      category: "debt",
      title: "💳 Reduce tu deuda en $20",
      description: "Abona $20 extra a tu deuda más pequeña.",
      reward: 40,
      actionLabel: "Registrar pago",
    },
    "Invertir de manera inteligente": {
      category: "investment",
      title: "📈 Explora una inversión nueva",
      description: "Lee sobre fondos indexados e inicia con $10.",
      reward: 60,
      actionLabel: "Explorar inversiones",
    },
  };

  return goals.map((goal, index) => {
    const template = missionTemplates[goal as keyof typeof missionTemplates];
    return {
      id: index + 1,
      category: template.category as "savings" | "debt" | "investment",
      title: template.title,
      description: template.description,
      reward: template.reward,
      actionLabel: template.actionLabel,
      status: "pending",
      urgency: Math.random() > 0.8, // 20% de misiones con urgencia
    };
  });
};

export default MissionsPage;
