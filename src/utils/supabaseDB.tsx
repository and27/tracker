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
    .select("*, payment_method(id, name), category(id,name)")
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

const addCategoryWithBudget = async (category: Category, userId: string) => {
  const { data, error } = await supabase
    .from("category")
    .insert([
      {
        name: category.name,
        group: category.group,
        user_id: userId,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding category:", error);
    return { data, error };
  }

  const { data: budgetData, error: budgetError } = await supabase
    .from("budgets")
    .insert([
      {
        category: data[0].id,
        user_id: userId,
        amount: category.budget,
        is_active: category.isActive,
      },
    ])
    .select();
  return { data, error, budgetData, budgetError };
};

const editCategoryWithBudget = async (category: Category, userId: string) => {
  const { data, error } = await supabase
    .from("category")
    .update({ name: category.name, group: category.group })
    .match({ id: category.id })
    .select();

  if (error) {
    console.error("Error updating category:", error);
    return { data, error };
  }

  const { data: budgetData, error: budgetError } = await supabase
    .from("budgets")
    .upsert([
      {
        category: category.id,
        user_id: userId,
        amount: category.budget,
        is_active: category.isActive,
      },
    ])
    .select();
  return { data, error, budgetData, budgetError };
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
    (acc: ConsolidatedTransactions, transaction) => {
      // Verify if the category is an array or a single object
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

      //verify if the date is valid
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

const getCategoriesWithBudget = async (
  userId: string
): Promise<CategoryGroup[]> => {
  const { data: categories, error: categoryError } = await supabase
    .from("category")
    .select("id, name, group");

  if (categoryError) {
    console.error("Error fetching categories:", categoryError);
    return [];
  }

  const { data: budgets, error: budgetError } = await supabase
    .from("budgets")
    .select("category, amount, is_active")
    .eq("user_id", userId);

  if (budgetError) {
    console.error("Error fetching budgets:", budgetError);
    return [];
  }

  const consolidated = categories.reduce((acc, category) => {
    if (!acc[category.group]) {
      acc[category.group] = {
        id: category.group,
        name: category.group,
        categories: [],
      };
    }
    const budget = budgets?.find((budget) => budget.category === category.id);
    acc[category.group].categories.push({
      id: category.id,
      name: category.name,
      group: category.group,
      isActive: budget ? budget.is_active : false,
      budget: budget ? budget.amount : null,
    });

    return acc;
  }, {} as Record<string, CategoryGroup>);

  return Object.values(consolidated);
};

export {
  createTransaction,
  getTransactions,
  getPaymentMethods,
  getCategories,
  addCategoryWithBudget,
  editCategoryWithBudget,
  removeCategoryByName,
  getCategoriesWithBudget,
  getLastTransactions,
  deleteTransaction,
};
