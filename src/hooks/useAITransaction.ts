import { useState } from "react";
import OpenAI from "openai";
import { defaultCategories } from "../data/defaultCategories";
import { defaultPaymentMethods } from "../data/defaultPaymentMethods";

export const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEP_SEEK_KEY,
  dangerouslyAllowBrowser: true,
});

const useAITransaction = () => {
  const [generatedTransaction, setGeneratedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractJSON = (text: string) => {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    return match ? match[1] : text;
  };

  const processTransaction = async (userInput: string) => {
    setLoading(true);
    try {
      const categoriesList = JSON.stringify(defaultCategories);
      const paymentMethodsList = JSON.stringify(defaultPaymentMethods);

      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are a financial assistant. Categorize transactions using only these categories: ${categoriesList} and this paymentMethods: ${paymentMethodsList} Respond in JSON format with this exact structure:`,
          },
          {
            role: "system",
            content: `{
            "description": "Short description",
            "date": "YYYY-MM-DD",
            "category": { "id": 1, "name": "food" },
            "amount": 0,
            "type": "income or expense",
            "paymentMethod": { "id": 1, "name": "credit card" },
          }`,
          },
          {
            role: "user",
            content: `Convert this into a structured JSON transaction: "${userInput}". Ensure the category and structure match exactly.`,
          },
        ],
        temperature: 0.2,
      });

      const rawText = completion.choices[0].message.content;
      const jsonText = extractJSON(rawText || "");
      console.log("JSON text:", jsonText);
      const jsonResponse = JSON.parse(jsonText);

      setGeneratedTransaction(jsonResponse);
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
    setLoading(false);
  };

  return { generatedTransaction, processTransaction, loading };
};

export default useAITransaction;
