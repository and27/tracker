import { create } from "zustand";
import { deleteTransaction, getTransactions } from "../utils/supabaseDB";

interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  loadTransactions: (userId: string) => Promise<void>;
  deleteTransaction: (id: string, userId: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getTransactions({ userId });
      if (error) {
        throw new Error(error.message);
      }
      set({ transactions: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteTransaction: async (id: string, userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await deleteTransaction(id, userId);
      if (error) {
        throw new Error(error.message);
      }
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
