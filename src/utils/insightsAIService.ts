import { openai } from "../hooks/useAITransaction";

export const getAIInsights = async (transactions: ConsolidatedTransactions) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a financial assistant. Based on the user's transactions, generate insights in the following compact JSON format:

        '{
          "spendingPatterns": [
            {
              "id": 1,
              "c": "Food",
              "d": "🔥 Your food expenses increased by 25% this month.",
              "p": 25,
              "ac": [
                { "l": "Set Budget Limit", "t": "budget_limit" },
              ]
            }
          ],
          "predictions": [
            {
              "id": 1,
              "d": "🔮 If you keep this trend, you will save $500 in 6 months.",
              "dt": "Projected Savings (6 months)",
              "ac": [
                { "l": "Increase Savings Rate", "t": "adjust_savings" },
              ]
            }
           
          ]
        }'

        Rules:
        - Use **short names**: 
          - "c" = category
          - "d" = desc
          - "p" = percent
          - "dt" = date
          - "ac" = action
          - "l" = label
          - "t" = type
        - Output **only the JSON** with no extra text. 
        Respond with JSON only, starting directly with '{' and ending with '}'.`,
        },
        {
          role: "user",
          content: `Analyze these transactions and generate structured insights:\n\n${JSON.stringify(
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

    if (!cleanJSON) throw new Error("Not response from AI model");
    return JSON.parse(cleanJSON);
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return ["⚠️ Error fetching AI insights"];
  }
};
