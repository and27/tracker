type Action = {
  label: string;
  type: string;
};

export interface BudgetInsight {
  id: number;
  name: string;
  value: number;
  actions: Action[];
}
const insightsMock = {
  spendingPatterns: [
    {
      id: 1,
      category: "Food",
      description: "🔥 Your food expenses increased by 25% this month.",
      percentage: 25,
      actions: [
        { label: "Set Budget Limit", type: "budget_limit" },
        { label: "Review Food Expenses", type: "review_expenses" },
      ],
    },
    {
      id: 2,
      category: "Entertainment",
      description: "🎮 You spent 40% of your budget on entertainment.",
      percentage: 40,
      actions: [
        { label: "Create Entertainment Budget", type: "budget_limit" },
        { label: "Enable Overspending Alert", type: "enable_alert" },
      ],
    },
    {
      id: 3,
      category: "Savings",
      description: "🏆 Your savings grew by 12% compared to last month.",
      percentage: 12,
      actions: [
        { label: "Adjust Savings Plan", type: "adjust_savings" },
        { label: "View Savings Breakdown", type: "view_savings" },
      ],
    },
  ],

  predictions: [
    {
      id: 1,
      description: "🔮 If you keep this trend, you will save $500 in 6 months.",
      date: "Projected Savings (6 months)",
      actions: [
        { label: "Increase Savings Rate", type: "adjust_savings" },
        { label: "Set Automatic Transfers", type: "setup_auto_savings" },
      ],
    },
    {
      id: 2,
      description: "📉 Your entertainment spending may exceed budget by 10%.",
      date: "Budget Exceed Warning",
      actions: [
        { label: "Review Budget", type: "review_budget" },
        { label: "Enable Spending Limit", type: "enable_spending_limit" },
      ],
    },
    {
      id: 3,
      description: "📈 Fuel prices are rising, transport costs may increase.",
      date: "Transport Cost Alert",
      actions: [
        {
          label: "Find Cheaper Transport Options",
          type: "find_transport_options",
        },
      ],
    },
  ],

  budgetOptimization: [
    {
      id: 1,
      name: "Food",
      value: 300,
      actions: [{ label: "Compare with Last Month", type: "compare" }],
    },
    {
      id: 2,
      name: "Rent",
      value: 1200,
      actions: [{ label: "View Rental Trends", type: "view_trends" }],
    },
    {
      id: 3,
      name: "Entertainment",
      value: 450,
      actions: [
        { label: "Reduce Entertainment Spending", type: "reduce_spending" },
      ],
    },
  ],

  tips: [
    {
      id: 1,
      description: "📖 Meal prepping can save you up to 30% on food expenses.",
      actions: [{ label: "Learn More", type: "learn_more" }],
    },
    {
      id: 2,
      description:
        "📌 Investing $50 per month in a savings fund could grow into $10,000 over 10 years.",
      actions: [
        { label: "View Investment Strategies", type: "view_investments" },
      ],
    },
    {
      id: 3,
      description:
        "💳 Your average credit card expense is $X. Consider paying off high-interest debt first.",
      actions: [
        { label: "Optimize Credit Card Usage", type: "optimize_credit" },
      ],
    },
  ],
};

export default insightsMock;
