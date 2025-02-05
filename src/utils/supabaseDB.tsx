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
