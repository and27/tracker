import { useState } from "react";
import OpenAI from "openai";
import { defaultPaymentMethods } from "../data/defaultPaymentMethods";
import { categoryGroups } from "../data/defaultCategories";

export const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEP_SEEK_KEY,
  dangerouslyAllowBrowser: true,
});

const useAITransaction = () => {
  const [generatedTransactions, setGeneratedTransactions] = useState<
    any[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const extractJSON = (text: string) => {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    return match ? match[1] : text;
  };

  const clearTransaction = () => {
    setGeneratedTransactions(null);
  };

  const removeTransaction = (transactionToRemove: Transaction) => {
    setGeneratedTransactions((prev) =>
      (prev || []).filter((t) => t !== transactionToRemove)
    );
  };

  const processTransactions = async (userInput: string) => {
    setLoading(true);
    try {
      const categoriesList = JSON.stringify(categoryGroups);
      const paymentMethodsList = JSON.stringify(defaultPaymentMethods);

      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are a financial assistant. Categorize multiple transactions using only these categories: ${categoriesList} and these payment methods: ${paymentMethodsList}. Respond in JSON format with this exact structure:`,
          },
          {
            role: "system",
            content: `[
              {
                "description": "Short description",
                "date": "YYYY-MM-DD",
                "category": { "id": 1, "name": "food" },
                "amount": 0,
                "type": "income or expense",
                "paymentMethod": { "id": 1, "name": "credit card" }
              }
            ]`,
          },
          {
            role: "user",
            content: `Convert these transaction(s) into structured JSON: "${userInput}". Ensure the categories and structure match exactly.`,
          },
        ],
        temperature: 0.2,
      });

      const rawText = completion.choices[0].message.content;
      const jsonText = extractJSON(rawText || "");
      const jsonResponse = JSON.parse(jsonText);

      setGeneratedTransactions(
        Array.isArray(jsonResponse) ? jsonResponse : [jsonResponse]
      );
    } catch (error) {
      console.error("Error processing transactions:", error);
    }
    setLoading(false);
  };

  return {
    generatedTransactions,
    processTransactions,
    loading,
    clearTransaction,
    removeTransaction,
  };
};

export default useAITransaction;
