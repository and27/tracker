import { Transaction } from "../pages/TransactionsPage";
import { supabase } from "./supabase";

const mapTransactionToDb = (transaction: Transaction) => {
  return {
    description: transaction.description,
    date: transaction.date,
    category: transaction.category,
    amount: transaction.amount,
    type: transaction.type,
    payment_method: transaction.paymentMethod,
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

const getTransactions = async () => {
  const { data, error } = await supabase.from("transaction").select("*");
  return { data, error };
};

const getPaymentMethods = async () => {
  const { data, error } = await supabase.from("payment_method").select("*");
  return { data, error };
};

const getCategories = async () => {
  const { data, error } = await supabase.from("category").select("*");
  console.log(data);
  return { data, error };
};

export { createTransaction, getTransactions, getPaymentMethods, getCategories };
