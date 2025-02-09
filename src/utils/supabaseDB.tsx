import { supabase } from "./supabase";

const mapTransactionToDb = (transaction: Transaction) => {
  return {
    description: transaction.description,
    date: transaction.date,
    category: transaction.category.id,
    amount: transaction.amount,
    type: transaction.type,
    payment_method: transaction.paymentMethod.id,
    user_id: transaction.userId,
  };
};

const createTransaction = async (transaction: Transaction) => {
  const transactionWithDBFormat = mapTransactionToDb(transaction);
  const { data, error } = await supabase
    .from("transaction")
    .insert([transactionWithDBFormat])
    .select();

  return { data, error };
};

const getTransactions = async ({ userId: user }: { userId: string }) => {
  const { data, error } = await supabase
    .from("transaction")
    .select("*, payment_method(id, name), category(id,name)")
    .eq("user_id", user)
    .order("date", { ascending: false });

  return { data, error };
};

const getLastTransactions = async ({
  user,
  limit,
}: {
  user: string;
  limit: number;
}) => {
  const { data, error } = await supabase
    .from("transaction")
    .select("*")
    .eq("user_id", user)
    .order("date", { ascending: false })
    .limit(limit);
  return { data, error };
};

const deleteTransaction = async (id: string) => {
  const { error } = await supabase.from("transaction").delete().match({ id });
  return { error };
};

const getPaymentMethods = async () => {
  let { data, error } = await supabase.from("payment_method").select("*");
  return { data, error };
};

const getCategories = async () => {
  const { data, error } = await supabase.from("category").select("*");
  return { data, error };
};

const addCategory = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from("category")
    .insert([{ name, user_id: userId }])
    .select();
  return { data, error };
};

const removeCategoryByName = async (name: string) => {
  const { data, error } = await supabase
    .from("category")
    .delete()
    .match({ name });
  return { data, error };
};

export const fetchConsolidatedTransactions = async (user: string) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  threeMonthsAgo.setHours(0, 0, 0, 0); // Asegura que sea el inicio del día

  const { data, error } = await supabase
    .from("transaction")
    .select("category(id, name), amount, date")
    .eq("user_id", user)
    .gte("date", threeMonthsAgo.toISOString())
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }

  if (!data || data.length === 0) return [];

  const consolidated = data.reduce(
    (
      acc: Record<
        number,
        {
          category: { id: number; name: string };
          total_spent: number;
          total_transactions: number;
          average_spent: number;
          last_transaction_date: string;
        }
      >,
      transaction
    ) => {
      // 🔹 Asegurar que `category` no sea un array antes de acceder a sus propiedades
      const category = Array.isArray(transaction.category)
        ? transaction.category[0]
        : transaction.category;

      if (!category || !category.id) return acc;

      if (!acc[category.id]) {
        acc[category.id] = {
          category: {
            id: category.id,
            name: category.name || "Unknown",
          },
          total_spent: 0,
          total_transactions: 0,
          average_spent: 0,
          last_transaction_date: "",
        };
      }

      acc[category.id].total_spent += transaction.amount;
      acc[category.id].total_transactions += 1;
      acc[category.id].average_spent =
        acc[category.id].total_spent / acc[category.id].total_transactions;

      // 🔹 Asegurar que `date` es una fecha válida antes de guardarla
      const transactionDate = new Date(transaction.date);
      if (!isNaN(transactionDate.getTime())) {
        acc[category.id].last_transaction_date = transactionDate.toISOString();
      }

      return acc;
    },
    {}
  );

  return Object.values(consolidated);
};

export {
  createTransaction,
  getTransactions,
  getPaymentMethods,
  getCategories,
  addCategory,
  removeCategoryByName,
  getLastTransactions,
  deleteTransaction,
};
