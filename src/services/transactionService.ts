import {
  createTransaction,
  getCategories,
  getPaymentMethods,
} from "../utils/supabaseDB";
import { toast } from "react-toastify";

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await getCategories();
  if (error) throw new Error("Failed to fetch categories");
  return data || [];
};

export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data, error } = await getPaymentMethods();
  if (error) throw new Error("Failed to fetch payment methods");
  return data || [];
};

export const saveTransaction = async (
  transaction: Transaction
): Promise<void> => {
  const { error } = await createTransaction(transaction);
  if (error) throw new Error("Failed to save transaction");
};

export const prepareTransactionData = (data: Transaction): Transaction => {
  const userId = localStorage.getItem("userId") as string;
  const workspaceId = localStorage.getItem("workspaceId") as string;
  return {
    ...data,
    userId,
    workspaceId,
    amount: Number(data.amount),
    category: {
      id: Number(data.category.id),
      name: "",
    },
    paymentMethod: {
      id: Number(data.paymentMethod.id),
      name: "",
    },
  };
};

export const handleError = (error: unknown) => {
  console.error(error);
  toast.error(
    `Something went wrong. ${
      error instanceof Error ? error.message : "Please try again later."
    }`,
    {
      position: "top-center",
    }
  );
};
