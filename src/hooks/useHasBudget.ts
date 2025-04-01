import { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import { supabase } from "../utils/supabase";

const useHasBudget = () => {
  const { user } = useAuth();
  const [hasBudget, setHasBudget] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("budgets")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (error) throw error;

        setHasBudget(data.length > 0);
      } catch (err: any) {
        console.error("Error fetching budgets:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [user?.id]);

  return { hasBudget, loading, error };
};

export default useHasBudget;
