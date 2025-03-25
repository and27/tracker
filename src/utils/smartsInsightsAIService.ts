import { openai } from "../hooks/useAITransaction";

export type SmartInsights = {
  byChart: {
    categorySpending: InsightItem[];
    monthlyComparison: InsightItem[];
    projections: InsightItem[];
  };
};

export type InsightItem = {
  id: string;
  c?: string; // category
  d: string; // description
  p?: number; // percentage
  ac?: { l: string; t: string }[]; // actions
};

export const getSmartInsights = async (
  lang: string,
  transactions: ConsolidatedTransactions
): Promise<SmartInsights | null> => {
  const l = lang === "en" ? "English" : "Spanish";

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a financial assistant. Based on the user's transactions, generate insights in ${l} using the following strict JSON format:

{
  "byChart": {
    "categorySpending": [
      {
        "id": "cat-1",
        "c": "Food",
        "d": "🍔 Food represents 42% of your total expenses this month.",
        "p": 42,
        "ac": [
          { "l": "Set Budget Limit", "t": "budget_limit" }
        ]
      }
    ],
    "monthlyComparison": [
      {
        "id": "comp-1",
        "c": "Transport",
        "d": "🚌 Transport spending increased 30% from last month.",
        "p": 30
      }
    ],
    "projections": [
      {
        "id": "proj-1",
        "d": "🔮 At this rate, you could save $500 in 6 months.",
        "ac": [
          { "l": "Adjust Savings Plan", "t": "adjust_savings" }
        ]
      }
    ]
  }
}

Use only the keys: "id", "c", "d", "p", "ac", "l", "t"
DO NOT include any explanation, only the raw JSON.
`,
        },
        {
          role: "user",
          content: `Analyze these transactions and generate smart financial insights:\n\n${JSON.stringify(
            transactions
          )}`,
        },
      ],
      temperature: 0.3,
    });

    const rawText = completion.choices[0].message.content;

    const cleanJSON = rawText
      ?.trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    if (!cleanJSON) throw new Error("No response from AI model");
    return JSON.parse(cleanJSON);
  } catch (error) {
    console.error("❌ Error fetching smart insights:", error);
    return null;
  }
};
