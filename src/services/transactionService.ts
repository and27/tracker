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

export const transformTransactionData = (data: Transaction): Transaction => {
  const userId = localStorage.getItem("userId") as string;
  return {
    ...data,
    userId,
    amount: Number(data.amount),
    categoryId: Number(data.categoryId),
    paymentMethodId: Number(data.paymentMethodId),
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
