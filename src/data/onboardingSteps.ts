const financialGoals = [
  { id: 1, label: "Ahorrar para una meta específica", icon: "💰" },
  { id: 2, label: "Reducir mis deudas", icon: "📉" },
  { id: 3, label: "Invertir de manera inteligente", icon: "📈" },
  { id: 4, label: "Controlar mejor mis gastos", icon: "📊" },
  { id: 5, label: "Prepararme para emergencias", icon: "🚨" },
  { id: 6, label: "Mejorar mi educación financiera", icon: "📚" },
];

const moneyManagmentOptions = [
  { id: 1, label: "I use a budgeting app", icon: "📊" },
  { id: 2, label: "I have a financial advisor", icon: "👩‍💼" },
  { id: 3, label: "I track my expenses manually", icon: "🧾" },
  { id: 4, label: "I don't have a budget", icon: "🤷" },
  { id: 5, label: "I have a retirement account", icon: "🏦" },
  { id: 6, label: "I invest in the stock market", icon: "📈" },
];

const onBoardingStepGoals = {
  id: "financialGoals",
  subtitle: "Step 1 of 3",
  title: "What are your financial goals?",
  description: "Select up to 3 options",
  options: financialGoals,
};

const onBoardingStepCategories = {
  id: "moneyManagement",
  subtitle: "Step 2 of 3",
  title: "How to you handle your money?",
  description: "Select up to 3 options",
  options: moneyManagmentOptions,
};

const onBoardingStepIncome = {
  id: "monthlyIncome",
  subtitle: "Step 3 of 3",
  title: "What is your monthly income?",
  description: "Select your monthly income range",
  options: [
    { id: 1, label: "Less than $1000", icon: "💸" },
    { id: 2, label: "$1000 - $2000", icon: "💰" },
    { id: 3, label: "$2000 - $3000", icon: "💵" },
    { id: 4, label: "$3000 - $4000", icon: "💳" },
    { id: 5, label: "$4000 - $5000", icon: "💲" },
    { id: 6, label: "More than $5000", icon: "💰" },
  ],
};

export const onboardingSteps = [
  onBoardingStepGoals,
  onBoardingStepCategories,
  onBoardingStepIncome,
];
