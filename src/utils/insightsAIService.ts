import { openai } from "../hooks/useAITransaction";

export const getAIInsights = async (transactions: any) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a financial assistant. Generate 5 concise and impactful insights based on the following user transactions.
          
          - Each insight should be **1 sentence long**.
          - Use an **emoji** at the beginning of each sentence.
          - Separate each insight with **"- "** at the beginning of the line.
          - The response should contain **only the 5 insights**, nothing else.

          Example Output:
          - 💸 Your insurance expense is your highest spending category at $86. Consider reviewing your policy for potential savings.
          - 🍔 You spent $22 on food this month, which is relatively low. Great job keeping food costs under control!
          - 🔧 Tools accounted for $20 of your spending. Ensure these purchases align with your long-term goals.
          - 🚗 Transport costs are minimal at $11 across 2 transactions. Keep up the efficient commuting habits!
          - 📅 Your last insurance payment is scheduled for February 2025. Plan ahead to avoid any surprises!
          
          Generate **5 similar insights** based on the user's transactions below.`,
        },
        {
          role: "user",
          content: `Analyze these transactions and provide 5 insights:\n\n${JSON.stringify(
            transactions
          )}`,
        },
      ],
      temperature: 0.3,
    });

    const rawText = completion.choices[0].message.content;

    return rawText
      ?.split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.replace("- ", ""));
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return ["⚠️ No se pudieron generar insights. Inténtalo más tarde."];
  }
};
