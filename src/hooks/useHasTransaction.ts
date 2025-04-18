import { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import { supabase } from "../utils/supabase";

const useHasTransaction = () => {
  const { user } = useAuth();
  const [hasTransaction, setHasTransaction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("transaction")
          .select("id")
          .eq("user_id", user.id)
          .limit(1);

        if (error) throw error;

        setHasTransaction(data.length > 0);
      } catch (err: any) {
        console.error("Error fetching transactions:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.id]);

  return { hasTransaction, loading, error };
};

export default useHasTransaction;
